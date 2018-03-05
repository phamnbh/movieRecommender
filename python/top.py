import pandas as pd
import numpy as np
import sys
import ast

df = pd.read_csv("/home/bobobis/Documents/GitHub/movieRecommender/python/topMoviesSorted.csv")
cdf = pd.read_csv("/home/bobobis/Documents/GitHub/movieRecommender/python/links_small.csv",low_memory=False)

genre = sys.argv[1]

if genre == 'All':
	for id in df.head(25)['id']:
		imdbID = cdf.loc[cdf['tmdbId'] == id]['imdbId'].values[0]
		while len(str(imdbID)) < 7:
			imdbID = '0'+ str(imdbID)
		print(imdbID)
else:
	count = 0
	for movie in df.values:
		if count > 25:
			break
		json = ast.literal_eval(movie[1])
		for genres in json:
			if genres['name'] == genre:
				imdbID = cdf.loc[cdf['tmdbId'] == movie[3]]['imdbId'].values[0]
				while len(str(imdbID)) < 7:
					imdbID = '0'+ str(imdbID)
				print(imdbID)
				count += 1


