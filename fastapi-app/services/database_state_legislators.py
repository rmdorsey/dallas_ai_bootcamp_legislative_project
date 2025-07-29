import psycopg2
import os

def query_legislator(table_name: str, column: str, value):
    """
    Finds a single legislator and returns their record as a dictionary.
    """
    conn_params = {
        'dbname': os.getenv('POSTGRES_DB'),
        'user': os.getenv('POSTGRES_USER'),
        'password': os.getenv('POSTGRES_PASSWORD'),
        'host': os.getenv('DB_HOST'),
        'port': os.getenv('DB_PORT')
    }
    
    # This diagnostic print is helpful, you can keep it or remove it
    print(f"🚨 ATTEMPTING TO CONNECT WITH: {conn_params}")

    conn = None
    record_to_return = None # Initialize the variable we will return

    try:
        print("Connecting to the PostgreSQL database...")
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()
        
        print(f"Querying table '{table_name}' where {column} = '{value}'...")
        sql_query = f"SELECT * FROM {table_name} WHERE {column} = %s;"
        cur.execute(sql_query, (value,))
        
        record = cur.fetchone()
        
        if record:
            colnames = [desc[0] for desc in cur.description]
            # Assign the found record to the variable we intend to return
            record_to_return = dict(zip(colnames, record))
            print(f"✅ Query successful! Record found: {record_to_return}")
        else:
            print(f"⚠️ Query successful, but no record found for {column} = '{value}'.")
            
        cur.close()
        
    except psycopg2.Error as e:
        print(f"❌ Error connecting to PostgreSQL or executing query: {e}")
        
    finally:
        if conn is not None:
            conn.close()
            print("\nDatabase connection closed.")
            
    # CRITICAL: This return statement must be here at the end of the function.
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