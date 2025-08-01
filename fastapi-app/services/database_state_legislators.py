import os
import psycopg2
from psycopg2 import sql # Import the 'sql' module for safe query composition

def query_legislator(table_name: str, column: str, value: str | int):
    """
    Finds a single legislator and returns their record as a dictionary.
    This version includes security enhancements and case-insensitive searching.
    """
    # --- 1. Security: Validate table and column names against an allowlist ---
    # This prevents SQL injection by ensuring only known, safe names are used.
    allowed_tables = {"house_representatives", "senate_senators"}
    allowed_columns = {"district_number", "full_name"}

    if table_name not in allowed_tables:
        print(f"❌ Error: Invalid table name '{table_name}'. Aborting query.")
        return None
    if column not in allowed_columns:
        print(f"❌ Error: Invalid column name '{column}'. Aborting query.")
        return None

    # --- Database Connection ---
    conn_params = {
        'dbname': os.getenv('POSTGRES_DB'),
        'user': os.getenv('POSTGRES_USER'),
        'password': os.getenv('POSTGRES_PASSWORD'),
        'host': os.getenv('DB_HOST'),
        'port': os.getenv('DB_PORT')
    }
    
    record_to_return = None

    # --- 2. Idiomatic Python: Use 'with' statements for resource management ---
    try:
        # The 'with' statement ensures the connection is always closed properly.
        with psycopg2.connect(**conn_params) as conn:
            with conn.cursor() as cur:
                
                # --- 3. Case-Insensitive & Secure Query Construction ---
                query_template = "SELECT * FROM {table} WHERE "
                
                # Apply LOWER() for text searches, but not for numeric searches
                if column == 'full_name':
                    query_template += "LOWER({col}) = LOWER(%s);"
                else: # Assumes district_number or other non-text types
                    query_template += "{col} = %s;"
                
                # Create the final, safe SQL query object using the sql module
                sql_query = sql.SQL(query_template).format(
                    table=sql.Identifier(table_name),
                    col=sql.Identifier(column)
                )
                
                print(f"Querying table '{table_name}' where {column} = '{value}'...")
                cur.execute(sql_query, (value,))
                
                record = cur.fetchone()
                
                if record:
                    colnames = [desc[0] for desc in cur.description]
                    record_to_return = dict(zip(colnames, record))
                    print(f"✅ Query successful! Record found.")
                else:
                    print(f"⚠️ Query successful, but no record found for {column} = '{value}'.")
                    
    except psycopg2.Error as e:
        print(f"❌ Error connecting to PostgreSQL or executing query: {e}")
        
    # The 'with' statements handle closing, but we print for clarity
    if 'conn' in locals() and conn.closed:
        print("\nDatabase connection closed.")
        
    return record_to_return

def get_all_legislators_from_chamber(table_name: str):
    """
    Retrieves all records from a specified legislator table.

    Args:
        table_name (str): The table to query ('house_representatives' or 'senate_senators').
    
    Returns:
        A list of dictionaries, where each dictionary is a legislator record.
    """

    allowed_tables = ['house_representatives', 'senate_senators']
    if table_name not in allowed_tables:
        print(f"❌ Error: Invalid table '{table_name}'.")
        return []

    conn_params = { 'dbname': os.getenv('POSTGRES_DB'), 'user': os.getenv('POSTGRES_USER'), 'password': os.getenv('POSTGRES_PASSWORD'), 'host': os.getenv('DB_HOST'), 'port': os.getenv('DB_PORT') }
    conn = None
    results = []
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()
        sql_query = f"SELECT * FROM {table_name};"
        cur.execute(sql_query)
        
        # Fetch all records
        records = cur.fetchall()
        
        if records:
            colnames = [desc[0] for desc in cur.description]
            for record in records:
                results.append(dict(zip(colnames, record)))
        
        cur.close()
    except psycopg2.Error as e:
        print(f"❌ Error during query: {e}")
    finally:
        if conn is not None:
            conn.close()
    return results

if __name__ == "__main__":
    # --- Example 1: Query House of Representatives by district number ---
    print("--- Querying House of Representatives ---")
    query_legislator(
        table_name='house_representatives', 
        column='district_number', 
        value=67
    )

    print("\n" + "="*60 + "\n")

    # --- Example 2: Query Senate by full name ---
    print("--- Querying Senate ---")
    # Replace 'John Cornyn' with a name that exists in your 'senate_senators' table
    query_legislator(
        table_name='senate_senators', 
        column='full_name', 
        value='Bob Hall'
    )

    print("\n" + "="*60 + "\n")

    # --- Example 3: An invalid table name to demonstrate the safety check ---
    print("--- Testing an invalid query ---")
    query_legislator(
        table_name='governors', 
        column='full_name', 
        value='Greg Abbott'
    )