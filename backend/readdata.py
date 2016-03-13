import csv
import math
from collections import defaultdict

times=[]
games=defaultdict(int)
players=defaultdict(int)
winners=defaultdict(int)
gamesadj=defaultdict(int)
gameSpecPlay=defaultdict(lambda: defaultdict(int))
gameSpecPlayAdj=defaultdict(lambda: defaultdict(int))
gameSpecWin=defaultdict(lambda: defaultdict(int))
gameSpecWinAdj=defaultdict(lambda: defaultdict(int))
playersadj=defaultdict(float)
winnersadj=defaultdict(float)
totalGames=0

with open('data.csv', newline='') as csvfile:
    datareader=csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in datareader:
        if(row[0]!="Timestamp"):
            totalGames+=1
            times.append(row[0])
            games[row[1]]+=1
            for player in row[2].split(", "):
                players[player]+=1
                gameSpecPlay[row[1]][player]+=1
            for winner in row[3].split(", "):
                winners[winner]+=1
                gameSpecWin[row[1]][winner]+=1
            
for key in games:
    gamesadj[key]=round(games[key]/totalGames, 4)
    for key2 in gameSpecWin[key]:
        gameSpecWinAdj[key][key2]=gameSpecWin[key][key2]/games[key]
    for key2 in gameSpecPlay[key]:
        gameSpecPlayAdj[key][key2]=gameSpecPlay[key][key2]/games[key]
for key in players:
    playersadj[key]=round(players[key]/totalGames, 4)
for key in winners:
    nonAdj=round(winners[key]/totalGames, 4)*100
    didAdj=round(winners[key]/players[key], 4)*100
    benefit=round((didAdj-nonAdj)/nonAdj, 4)*100
    print(key+" non adjusted: "+str(nonAdj)+" adjusted: "+str(didAdj)+" benefit: "+str(benefit))
    winnersadj[key]=round(winners[key]/players[key], 4)

with open('../public/data/plays.csv', 'w', newline='') as fp:
    a=csv.writer(fp, delimiter=',')
    a.writerow(['player', 'count'])
    for key in players:
        a.writerow([key, players[key]])

with open('../public/data/wins.csv', 'w', newline='') as fp:
    a=csv.writer(fp, delimiter=',')
    a.writerow(['player', 'count'])
    for key in winners:
        a.writerow([key, winners[key]])

with open('../public/data/allgames.csv', 'w', newline='') as fp:
    a=csv.writer(fp, delimiter=',')
    a.writerow(['player', 'count'])
    for key in games:
        a.writerow([key, games[key]])

for key in games:
    with open('../public/data/'+key+'.csv', 'w', newline='') as fp:
        a=csv.writer(fp, delimiter=',')
        a.writerow(['player', 'count'])
        for key2 in gameSpecWin[key]:
            a.writerow([key2, gameSpecWin[key][key2]])
	




