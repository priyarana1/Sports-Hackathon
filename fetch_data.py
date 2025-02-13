import requests
import sqlalchemy
import pandas


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
    
print(response) #must return 200
responseData = response.json()



print(getData(urlRutgersTeam))
print(getData(urlRutgersPlayers))
print(getData(urlRutgersStandings))
print(getData(urlRutgersGames))
print(getData(urlRutgersStats))
print(getData(urlRutgersPlayerStats))


print(response) #must return 200
responseData = response.json()
#print(responseData)
#df = pandas.json_normalize(responseData, 'response')
#print(df)