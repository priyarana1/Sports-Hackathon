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

response = requests.get(url, headers=headers)
print(response) #must return 200
responseData = response.json()


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
df_ncaa_standings = pd.json_normalize(response['response'], sep='_')

#extracts neccessary data for ncaa standings
df_ncaa_standings = df_ncaa_standings[[
    'league_id', 'league_name', 'league_season',
    'team_id', 'team_name', 'team_logo',
    'position', 'points_for', 'points_against',
    'games_played', 'games_win_total', 'games_lose_total'
]]

#renames columns
#df_ncaa_standings.columns = [
#    'League_ID', 'League_Name', 'Season',
 #   'Team_ID', 'Team_Name', 'Team_Logo',
#    'Ranking', 'Points',
#    'Games_Played', 'Wins', 'Losses'
#]



#print json standings data to see why im getting an error
#look at column names, make sure they match what i derived
data = getData(urlRutgersStandings)  # Fetch raw JSON
print(json.dumps(data, indent=4))  # Pretty print the JSON



#checking the json data structure 
#print(df_ncaa_standings.head())  # Show first few rows
#print(df_ncaa_standings.columns)  # Show available columns


#extracts neccessary data for ncaa standings

#print dataframes
#print(df_ncaa_standings.head())  #prints first 5 rows
#print(df_rutgers_team.head())
#print(df_rutgers_players.head())
#print(df_rutgers_games.head())
#print(df_rutgers_team_stats.head())
#print(df_rutgers_player_stats.head())



#show all json data
#print(getData(urlRutgersTeam))
#print(getData(urlRutgersPlayers))
#print(getData(urlRutgersStandings))
#print(getData(urlRutgersGames))
#print(getData(urlRutgersStats))
#print(getData(urlRutgersPlayerStats))


#print(response) #must return 200
#responseData = response.json()
#print(responseData)
#df = pandas.json_normalize(responseData, 'response')
#print(df)


