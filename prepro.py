
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('Porto_taxi_data_test_partial_trajectories.csv')
timestamp = df['TIMESTAMP'] - df['TIMESTAMP']%15
t = timestamp.to_numpy()
#len(t)


data= []

a = df['POLYLINE']
for i in range(  len(a) ) :
    a_i = eval(a[i])
    data.append([])
    for j in range(len(a_i)):
        data[i].append( { "lat": a_i[j][1]  , "lng": a_i[j][0] } )

#data = np.array(data)
#len(data)

cont = 0

all_paths = {}
for i in range(len(data)):
    for j in range(len(data[i])):
        if(str(t[i] + 15*j ) not in all_paths.keys() ): all_paths[str(t[i] + 15*j )] = []
        if ( j==0):
            all_paths[str(t[i] + 15*j )].append({'punto':True,'ruta':[data[i][0]]})
        else:
            all_paths[str(t[i] + 15*j )].append({'punto':False, 'ruta':[data[i][j-1],data[i][j]]})
all_paths['1408039035']
all_paths.keys()


print('{')
for i in sorted (all_paths.keys()):
    print("'"+i+"':")
    print(all_paths[i])
    print(',')
    
    
print('}')

