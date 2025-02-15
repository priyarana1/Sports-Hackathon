import requests
from dotenv import load_dotenv
import os

#checks how many requests, ensures we aren't above daily limit

# API endpoint
url = "https://v1.basketball.api-sports.io/status"

apiKey = os.getenv("apiKey") #api key (priya's profile)

headers = {
    "x-apisports-key": apiKey 
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print("API Response:", data)

    if "response" in data and isinstance(data["response"], dict):
        current_requests = data["response"]["requests"]["current"]
        daily_limit = data["response"]["requests"]["limit_day"]
        print(f"Current API requests used: {current_requests}/{daily_limit}")
    else:
        print("Error: No valid data in 'response'. Check your API key and request.")
else:
    print(f"Error {response.status_code}: {response.text}")
