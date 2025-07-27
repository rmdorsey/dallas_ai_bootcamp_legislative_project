import pandas as pd
import requests
from bs4 import BeautifulSoup

# Load the csv file
# Make sure 'house_bio_urls.csv' is in the same directory as the script
try:
    df = pd.read_csv('house_bio_urls.csv')
except FileNotFoundError:
    print("Error: 'house_bio_urls.csv' not found. Please ensure the file is in the same folder as the script.")
    exit()

# Function to scrape biography from a URL
def get_biography(url):
    """
    Visits a URL and scrapes the text content from the <section id="biography">.
    """
    if pd.isna(url):
        return "No URL provided"
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()  # Raise an exception for bad status codes (like 404 or 500)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the <section> tag with the id="biography"
        biography_section = soup.find('section', id='biography')

        if biography_section:
            # Find all the <p> (paragraph) tags within that section
            paragraphs = biography_section.find_all('p')
            # Join the text from all paragraphs, stripping leading/trailing whitespace
            # and filtering out any empty paragraphs.
            biography_text = "\n".join([p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)])
            return biography_text
        else:
            return "Biography section not found on page."

    except requests.exceptions.RequestException as e:
        return f"Error fetching URL: {e}"

# --- Main Script Execution ---
print("Starting biography scraping process...")

# Create a new column 'biography' by applying the function to the 'Biography URL' column
# This will take some time to run as it is visiting every URL.
df['biography'] = df['Biography URL'].apply(get_biography)

print("Scraping complete!")

# Save the updated dataframe to a new csv file
output_filename = 'house_biographies_with_content.csv'
df.to_csv(output_filename, index=False)

print(f"Biographies have been scraped and saved to '{output_filename}'")