import json

with open('NCAA Standings_response.json', 'r') as f:
    input_data = json.load(f)

transformed_data = {
    "season": "2023-2024",
    "conferences": {}
}

for team_data in input_data['response'][0]:
    conference_name = team_data['group']['name']
    
    # creates conference
    if conference_name not in transformed_data['conferences']:
        transformed_data['conferences'][conference_name] = []
    
    # team entry
    team_entry = {
        "position": team_data['position'],
        "team_name": team_data['team']['name'],
        "team_id": team_data['team']['id'],
        "games_played": team_data['games']['played'],
        "wins": team_data['games']['win']['total'],
        "losses": team_data['games']['lose']['total'],
        "win_percentage": team_data['games']['win']['percentage'],
        "points_for": team_data['points']['for'],
        "points_against": team_data['points']['against'],
        "point_differential": team_data['points']['for'] - team_data['points']['against']
    }
    
    #add each team to conference
    transformed_data['conferences'][conference_name].append(team_entry)

#sorts teams in each conference by position
for conference in transformed_data['conferences'].values():
    conference.sort(key=lambda x: x['position'])

with open('DF_NCAA_standings.json', 'w') as f:
    json.dump(transformed_data, f, indent=4)