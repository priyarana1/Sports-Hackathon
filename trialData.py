import requests
import sqlalchemy
import pandas as pd
import json


#from api dashboard
rutgers_team_id = 2096
ncaa_league_id = 116
season = "2023-2024"



url = "https://v1.basketball.api-sports.io/leagues" #overall url from website
apiKey = "b12e1a56d3f6803de2e8961389f6768f" #api key (priya's profile)

#specific to rutgers, ncaa
urlRutgersTeam = f"https://v1.basketball.api-sports.io/teams?id={rutgers_team_id}"
urlRutgersPlayers = f"https://v1.basketball.api-sports.io/players?team={rutgers_team_id}&season={season}"
urlRutgersStandings = f"https://v1.basketball.api-sports.io/standings?league={ncaa_league_id}&season={season}"
urlRutgersGames = f"https://v1.basketball.api-sports.io/games?league={ncaa_league_id}&season={season}&team={rutgers_team_id}"
urlRutgersStats = f"https://v1.basketball.api-sports.io/games/statistics/teams?team={rutgers_team_id}&season={season}"
urlRutgersPlayerStats = f"https://v1.basketball.api-sports.io/games/statistics/players?team={rutgers_team_id}&season={season}"


headers = {
    "x-apisports-key": apiKey,
    "x-rapidapi-host": "v1.basketball.api-sports.io",
    "Content-Type":"application/json",
    "Accept-Encoding":"deflate"
}

#function to pull data
def getData(url):
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json() #converts to json data
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None
    
#function to create dataframe
def get_dataframe(url, name):
    data = getData(url)  
    if data and isinstance(data, dict) and 'response' in data:  # Ensure data is a dictionary
        df = pd.json_normalize(data['response'])  
        df.name = name  
        return df
    else:
        print(f"Error fetching {name} or response key missing")
        return None

df_ncaa_standings = get_dataframe(urlRutgersStandings, "NCAA Standings")
df_rutgers_team = get_dataframe(urlRutgersTeam, "Rutgers Team Info")
df_rutgers_players = get_dataframe(urlRutgersPlayers, "Rutgers Players")
df_rutgers_games = get_dataframe(urlRutgersGames, "Rutgers Games")
df_rutgers_team_stats = get_dataframe(urlRutgersStats, "Rutgers Team Stats")
df_rutgers_player_stats = get_dataframe(urlRutgersPlayerStats, "Rutgers Player Stats")

responseData = response.json() #convert data to json
print(json.dumps(responseData, indent=4))  # Pretty print JSON to check its structure
df_ncaa_standings = pd.json_normalize(responseData['response'], sep='_')