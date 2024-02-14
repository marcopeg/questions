import os
import psycopg2
import random
import string
import sys

# Generate a random ID for the story
def generate_story_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))

# Insert the story into the "stories" table
def insert_story(conn, story_id, title, paragraphs):
    with conn.cursor() as cursor:
        cursor.execute("INSERT INTO stories (id, title) VALUES (%s, %s)", (story_id, title))
        for lang, paragraph in paragraphs.items():
            cursor.execute("INSERT INTO stories_lines (id, language, story_id, paragraph, \"order\") VALUES (%s, %s, %s, %s, %s)",
                           (generate_story_id(), lang, story_id, paragraph, 0))
    conn.commit()

# Insert the translated titles into the "stories_titles" table
def insert_titles(conn, story_id, titles):
    with conn.cursor() as cursor:
        for lang, title in titles.items():
            cursor.execute("INSERT INTO stories_titles (language, story_id, title) VALUES (%s, %s, %s)",
                           (lang, story_id, title))
    conn.commit()

# Read the input text from a file
def read_input_text(filename):
    input_data = {}
    with open(filename, 'r') as file:
        for line in file:
            lang, text = line.strip().split(':')
            input_data[lang] = text
    return input_data

# Get the database connection string from an environment variable
# db_conn_string = os.getenv('DB_CONN_STRING')
db_conn_string = 'postgres://postgres:postgres@postgres/postgres'

# Check if the connection string is set
if db_conn_string is None:
    print("Database connection string not found. Please set the DB_CONN_STRING environment variable.")
    sys.exit(1)

# Connect to the database
conn = psycopg2.connect(db_conn_string)

# Create the necessary tables if they don't exist
with conn.cursor() as cursor:
    cursor.execute('''CREATE TABLE IF NOT EXISTS stories
                      (id TEXT PRIMARY KEY,
                       title TEXT)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS stories_titles
                      (language TEXT,
                       story_id TEXT,
                       title TEXT,
                       FOREIGN KEY (story_id) REFERENCES stories (id))''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS stories_lines
                      (id TEXT PRIMARY KEY,
                       language TEXT,
                       story_id TEXT,
                       paragraph TEXT,
                       "order" INTEGER,
                       FOREIGN KEY (story_id) REFERENCES stories (id))''')

# Example input file: input.txt
# EN-US:Timmy and the Talking Squirrel
# IT-IT:Timmy e lo Scoiattolo Parlante
# SE-SE:Timmy och den Talande Ekorren
input_filename = sys.argv[1] if len(sys.argv) > 1 else 'input.txt'
input_data = read_input_text(input_filename)

# Generate a random story ID
story_id = generate_story_id()

# Insert the story, titles, and paragraphs into the database
insert_story(conn, story_id, input_data['EN-US'], {lang: text for lang, text in input_data.items()})
insert_titles(conn, story_id, {lang: title for lang, title in input_data.items()})

# Close the database connection
conn.close()
