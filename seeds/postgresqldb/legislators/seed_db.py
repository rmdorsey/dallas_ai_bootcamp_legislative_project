import os
import csv
import time
import pathlib
import re
from sqlalchemy import create_engine, text, inspect, Table, Column, Integer, String, MetaData

def sanitize_key(key):
    """
    Sanitizes a CSV header to be a valid database column name.
    - Converts to lowercase
    - Removes content in parentheses (e.g., " (including joint)")
    - Replaces spaces and hyphens with underscores
    - Handles numbered columns correctly (e.g., "District Office Address 1")
    """
    s = key.strip().lower()
    s = re.sub(r'\s*\([^)]*\)', '', s) # Remove content in parentheses
    s = re.sub(r'[\s-]+', '_', s)      # Replace spaces and hyphens with underscores
    s = re.sub(r'[^a-z0-9_]', '', s)   # Remove any remaining invalid characters
    return s

def get_db_engine():
    """
    Creates and tests a SQLAlchemy engine using environment variables.
    Retries connection several times to wait for the database container to be ready.
    """
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise ValueError("DATABASE_URL environment variable is not set.")

    engine = create_engine(db_url)
    retries = 5
    delay = 5  # seconds
    for i in range(retries):
        try:
            with engine.connect() as connection:
                print("✅ Database connection successful.")
                return engine
        except Exception as e:
            print(f"Database connection failed. Retrying in {delay} seconds... ({i+1}/{retries})")
            print(f"Error: {e}")
            time.sleep(delay)
    raise ConnectionError("Could not connect to the database after several retries.")

def create_tables(engine):
    """
    Defines and creates the 'house_representatives' and 'senate_senators' tables
    if they do not already exist, with schemas matching their respective CSV files.
    """
    meta = MetaData()

    # Define the table for Texas House Representatives
    Table(
        'house_representatives', meta,
        Column('id', Integer, primary_key=True, autoincrement=True),
        Column('district_number', Integer, index=True),
        Column('full_name', String),
        Column('capitol_office_address', String),
        Column('capitol_office_phone_number', String),
        Column('district_office_address', String),
        Column('district_office_phone_number', String),
        Column('contact_page_url', String),
        Column('biography', String),
        Column('member_page_url', String),
        Column('biography_url', String),
        Column('picture_url', String), # Specific to House CSV
        Column('legislation_authored_url', String),
        Column('legislation_coauthored_url', String),
        Column('legislation_sponsored_url', String),
        Column('legislation_cosponsored_url', String),
    )

    # Define the table for Texas State Senators
    Table(
        'senate_senators', meta,
        Column('id', Integer, primary_key=True, autoincrement=True),
        Column('district_number', Integer, index=True),
        Column('full_name', String),
        Column('contact_page_url', String),
        Column('photo_url', String), # Specific to Senate CSV
        Column('member_page_url', String),
        Column('biography', String),
        Column('capitol_office_address', String),
        Column('capitol_office_phone_number', String),
        # Multiple district office columns, specific to Senate CSV
        Column('district_office_address_1', String),
        Column('district_office_phone_number_1', String),
        Column('district_office_address_2', String),
        Column('district_office_phone_number_2', String),
        Column('district_office_address_3', String),
        Column('district_office_phone_number_3', String),
        Column('district_office_address_4', String),
        Column('district_office_phone_number_4', String),
        Column('district_office_address_5', String),
        Column('district_office_phone_number_5', String),
        Column('district_office_address_6', String),
        Column('district_office_phone_number_6', String),
    )

    print("Creating tables...")
    meta.create_all(engine)
    print("✅ Tables created successfully (if they didn't exist).")

def seed_data(engine, table_name, csv_file_path):
    """
    Seeds data from a given CSV file into a specified table.
    This version includes robust type conversion for integer fields.
    This entire function operates within a single transaction.
    """
    try:
        with engine.connect() as connection:
            with connection.begin():  # Start a single transaction
                result = connection.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
                count = result.scalar()

                if count > 0:
                    print(f"☑️ Table '{table_name}' is already seeded. Skipping.")
                    return

                print(f"Seeding data into '{table_name}' from '{csv_file_path}'...")
                with open(csv_file_path, mode='r', encoding='utf-8') as csvfile:
                    reader = csv.DictReader(csvfile)
                    
                    inspector = inspect(engine)
                    columns_in_db = {c['name'] for c in inspector.get_columns(table_name)}

                    for row in reader:
                        # Sanitize keys first
                        sanitized_row = {sanitize_key(k): v for k, v in row.items()}
                        
                        # --- FIX START: Process and clean the data before insertion ---
                        processed_row = {}
                        for key, value in sanitized_row.items():
                            if key not in columns_in_db:
                                continue # Skip columns that don't exist in the database table

                            # Specifically handle the district_number conversion
                            if key == 'district_number':
                                try:
                                    # If value is a non-empty string, convert to int.
                                    # If it's an empty string, this will result in None.
                                    processed_row[key] = int(value) if value else None
                                except (ValueError, TypeError):
                                    # If conversion fails for any other reason (e.g., non-numeric text)
                                    print(f"⚠️ Warning: Could not convert district_number '{value}' to int. Setting to NULL. Row: {row}")
                                    processed_row[key] = None
                            else:
                                # For all other columns, just assign the string value
                                processed_row[key] = value
                        # --- FIX END ---

                        # Ensure we don't try to insert an empty row
                        if not processed_row:
                            continue

                        # Prepare and execute the insert statement with the cleaned data
                        columns = ", ".join(processed_row.keys())
                        placeholders = ", ".join([f":{key}" for key in processed_row.keys()])
                        insert_stmt = text(f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})")
                        connection.execute(insert_stmt, processed_row)

                print(f"✅ Successfully seeded '{table_name}'.")
    except FileNotFoundError:
        print(f"🚨 ERROR: CSV file not found at {csv_file_path}. Please check the path.")
    except Exception as e:
        print(f"🚨 An error occurred during seeding of '{table_name}': {e}")

def verify_data(engine):
    """
    Connects to the database and prints the row count of each table to verify seeding.
    """
    print("\n🔍 Verifying data...")
    try:
        with engine.connect() as connection:
            # Verify house_representatives
            house_result = connection.execute(text("SELECT COUNT(*) FROM house_representatives"))
            house_count = house_result.scalar()
            print(f"  - Found {house_count} rows in 'house_representatives' table.")

            # Verify senate_senators
            senate_result = connection.execute(text("SELECT COUNT(*) FROM senate_senators"))
            senate_count = senate_result.scalar()
            print(f"  - Found {senate_count} rows in 'senate_senators' table.")
            print("✅ Verification complete.")
    except Exception as e:
        print(f"🚨 An error occurred during verification: {e}")


if __name__ == "__main__":
    print("🚀 Starting database initialization script...")

    script_dir = pathlib.Path(__file__).parent.resolve()
    house_csv = script_dir / 'data' / 'State_House_Reps.csv'
    senate_csv = script_dir / 'data' / 'State_Senate.csv'

    engine = None
    try:
        engine = get_db_engine()
        
        create_tables(engine)
        
        seed_data(engine, 'house_representatives', house_csv)
        
        seed_data(engine, 'senate_senators', senate_csv)

        # Add verification step after seeding
        verify_data(engine)
        
        print("🎉 Database initialization complete.")
    except Exception as e:
        print(f"🚨 A critical error occurred during initialization: {e}")
    finally:
        if engine:
            engine.dispose()
            print("Database engine-pool disposed.")
