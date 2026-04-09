import pandas as pd

# Load the CSV
df = pd.read_csv("contacts2.csv")

# Drop duplicate rows
df_clean = df.drop_duplicates()

# Save back to CSV
df_clean.to_csv("contacts.csv", index=False)
