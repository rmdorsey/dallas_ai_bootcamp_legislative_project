import requests
from bs4 import BeautifulSoup
import csv
import os

def scrape_senate_bios():
    """
    Scrapes the Texas Senate website for member biographies and saves them to a CSV file.

    This function iterates through all 31 senate district member pages,
    extracts the senator's full name and their biography text, and then
    writes this information to a CSV file named 'senate_biographies.csv'.
    """
    # Base URL for the member pages. The district number will be appended.
    base_url = "https://senate.texas.gov/member.php?d="
    
    # List to hold the data for each senator
    senator_data = []

    print("Starting to scrape Texas Senate member pages...")

    # There are 31 districts in the Texas Senate.
    for district_num in range(1, 32):
        member_page_url = f"{base_url}{district_num}"
        
        try:
            # Fetch the HTML content of the member page
            response = requests.get(member_page_url)
            # Raise an exception for bad status codes (4xx or 5xx)
            response.raise_for_status()

            # Parse the HTML using BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            # --- Extract Senator's Name ---
            # The name is typically in the 'alt' attribute of the headshot image.
            # We find the image by its ID 'memhead'.
            headshot_img = soup.find('img', id='memhead')
            if headshot_img and 'alt' in headshot_img.attrs:
                full_name = headshot_img['alt'].strip()
            else:
                # Fallback if the headshot or alt text isn't found.
                # This handles placeholder pages or pages with different structures.
                full_name = f"Name not found for District {district_num}" # Default value
                title_tag = soup.find('title')
                if title_tag:
                    title_text = title_tag.text
                    # Check if the title contains the expected separator before splitting.
                    if '- Senator' in title_text:
                        try:
                            # Safely split and extract the name.
                            name_part = title_text.split('- Senator')[1].split(':')[0].strip()
                            full_name = name_part
                        except IndexError:
                            # This handles cases where the format is still unexpected.
                            print(f"Warning: Could not parse name from title for District {district_num}. Title was: '{title_text}'")
                    else:
                        print(f"Warning: '- Senator' not in title for District {district_num}. Title was: '{title_text}'")


            # --- Extract Biography ---
            # The biography is contained within a div with the class 'bio'.
            bio_div = soup.find('div', class_='bio')
            
            if bio_div:
                # Get all the text from the bio div.
                # .get_text(separator=' ', strip=True) helps clean up the text
                # by replacing tags like <br> with spaces and removing extra whitespace.
                biography = bio_div.get_text(separator=' ', strip=True)
            else:
                # If no bio div is found, we'll leave the biography blank.
                biography = ""

            # Add the collected data to our list
            senator_data.append({
                "District Number": district_num,
                "Full Name": full_name,
                "Biography": biography
            })
            
            print(f"Successfully scraped District {district_num}: {full_name}")

        except requests.exceptions.RequestException as e:
            print(f"Could not retrieve page for District {district_num}. URL: {member_page_url}. Error: {e}")
            # Add a placeholder entry if the page fails to load
            senator_data.append({
                "District Number": district_num,
                "Full Name": "Page Request Failed",
                "Biography": ""
            })

    # --- Write data to CSV ---
    # Define the output filename
    output_filename = "senate_biographies.csv"
    
    # Define the headers for the CSV file
    headers = ["District Number", "Full Name", "Biography"]

    try:
        with open(output_filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=headers)
            
            # Write the header row
            writer.writeheader()
            
            # Write the data for each senator
            writer.writerows(senator_data)
            
        print(f"\nScraping complete. Data saved to '{os.path.abspath(output_filename)}'")

    except IOError as e:
        print(f"Error writing to CSV file: {e}")


if __name__ == "__main__":
    scrape_senate_bios()