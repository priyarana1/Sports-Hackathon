import requests
import pandas as pd
import json

# API Credentials
apiKey = "1ac4a220e607541ff2427fac694a4717"
apiKey = "b12e1a56d3f6803de2e8961389f6768f"
apiKey = "5c35bc363365e2c756b76baa578c4719"


#general information
rutgers_team_id = 2096
ncaa_league_id = 116
season = "2023-2024"
current_season = "2024-2025"

#endpoints from api website
urlRutgersStandings = f"https://v1.basketball.api-sports.io/standings?league={ncaa_league_id}&season={season}"
urlRutgersGames = f"https://v1.basketball.api-sports.io/games?league={ncaa_league_id}&season={season}&team={rutgers_team_id}"
urlRutgersGames_2022_2023 = f"https://v1.basketball.api-sports.io/games?league={ncaa_league_id}&season={"2022-2023"}&team={rutgers_team_id}"

urlRutgersStats = f"https://v1.basketball.api-sports.io/games/statistics/teams?id=2096"
urlRutgersPlayerStats = f"https://v1.basketball.api-sports.io/games/statistics/players?team={rutgers_team_id}&season={season}"

#2024-2025 season, will keep updating (reoccuring calls to api to update data)
#the free subscription only includes seasons 2021-2023. in the actual product, we would pay for this feature and users will have updated data
urlRutgersGames_current = f"https://v1.basketball.api-sports.io/games?league={ncaa_league_id}&season={current_season}&team={rutgers_team_id}"




headers = {
    "x-apisports-key": apiKey,
    "x-rapidapi-host": "v1.basketball.api-sports.io",
    "Content-Type": "application/json",
    "Accept-Encoding": "deflate"
}

#fetches data from url
def getData(url, name):
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()

        #print to out file (not in terminal)
        with open(f"{name}_response.json", "w") as outfile:
            json.dump(data, outfile, indent=4)

        if "response" in data and data["response"]:
            return data["response"]
        else:
            with open("log.txt", "a") as log: #outfile so we can see all the information
                log.write(f"⚠️ No valid data found for {name}\n")
            return None
    else:
        with open("log.txt", "a") as log:
            log.write(f"Error: {response.status_code}, {response.text}\n")
        return None

#creata dataframes for each url
def get_dataframe(url, name):
    data = getData(url, name) #uses get data function
    if data:
        df = pd.json_normalize(data)
        with open(f"{name}_response.json", "a") as outfile: #outfile so we can see all the information
            outfile.write("\n\n✅ Available Columns:\n")
            json.dump(df.columns.tolist(), outfile, indent=4)
        return df
    return None




#get the data frames from the data
df_ncaa_standings = get_dataframe(urlRutgersStandings, "NCAA Standings")
df_rutgers_games_2023_2024 = get_dataframe(urlRutgersGames, "Rutgers Games")
df_rutgers_team_stats = get_dataframe(urlRutgersStats, "Rutgers Team Stats")
df_rutgers_player_stats = get_dataframe(urlRutgersPlayerStats, "Rutgers Player Stats")
df_rutgers_games_2022_2023 = get_dataframe(urlRutgersGames_2022_2023, "Rutgers Games 2022-2023")
#df_rutgers_games_current = get_dataframe(urlRutgersGames_current, "Current Season Games") --> not included in subscription


#print(df_rutgers_team_stats)


#df_ncaa_standings.to_json("NCAA Standings 2023-2024", orient="records", indent=4) #print ncaa standings df to json file)


#change rutgers games dataframe to contain only relevant information
#college basketball is only played by quarter so q2 and q4 are saved as h1 and h2

df_ncaa_standings.normalize()
print(df_ncaa_standings)


#store all available columns in dataframe
available_columns_games = df_rutgers_games_2023_2024.columns.tolist()

#columns that we want to store
selected_columns_rutgersGames = [
    'date', 'league.season', 
    'teams.home.name', 'teams.home.logo', 
    'teams.away.name', 'teams.away.logo', 
    'scores.home.quarter_2', 'scores.home.quarter_4', 'scores.home.total', 
    'scores.away.quarter_2', 'scores.away.quarter_4', 'scores.away.total'
]

#ensures that columns exist 
selected_columns_games = [col for col in selected_columns_rutgersGames if col in available_columns_games]
df_rutgers_games_2022_2023 = df_rutgers_games_2022_2023[selected_columns_games] #update dataframe with selected columns 2022-2023
df_rutgers_games_2023_2024 = df_rutgers_games_2023_2024[selected_columns_games] #update dataframe with selected columns 2023-2024


#rename 2022-2023 columns
df_rutgers_games_2022_2023.columns = [
   'Data', 'Season', 
   'Home Team', 'Home Team Logo', 
   'Away Team', 'Away Team Logo',
   'Home Team: H1 Points', 'Home Team: H2 Points', 'Home Team: Total Points',
   'Away Team: H1 Points', 'Away Team: H2 Points', 'Away Team: Total Points'
]

#rename 2023-2024 columns
df_rutgers_games_2023_2024.columns = [
   'Data', 'Season', 
   'Home Team', 'Home Team Logo', 
   'Away Team', 'Away Team Logo',
   'Home Team: H1 Points', 'Home Team: H2 Points', 'Home Team: Total Points',
   'Away Team: H1 Points', 'Away Team: H2 Points', 'Away Team: Total Points'
]
#check dataframe 
df_rutgers_games_2022_2023.to_json("Rutgers_Games_2022_2023.json", orient="records", indent=4) #print df to json file
df_rutgers_games_2023_2024.to_json("Rutgers_Games_2023_2024.json", orient="records", indent=4) #print df to json file
