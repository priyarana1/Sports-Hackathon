import requests

apiKey = "b12e1a56d3f6803de2e8961389f6768f"
baseURL = "https://v1.basketball.api-sports.io"

headers = {
    "x-apisports-key": apiKey
}

def get_team_info(team_name="Rutgers"):
    url = f"{baseURL}/teams"
    parameters = {"search": team_name}

    response  = requests.get(url, headers=headers, params=parameters)
    
    if response.status_code == 200:
        data = response.json()
        return response.json()
    else:
        print("Error fetching data:", response.json())
        return None
    
teamData = get_team_info()
print(teamData)