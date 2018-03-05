import pandas as pd
import numpy as np
import ast
from sklearn.metrics.pairwise import linear_kernel
import sys

df = pd.read_csv("/home/bobobis/Documents/GitHub/movieRecommender/python/tmdb_5000_movies.csv",low_memory=False)
cdf = pd.read_csv("/home/bobobis/Documents/GitHub/movieRecommender/python/links_small.csv",low_memory=False)

cosine_sim = np.load('/home/bobobis/Documents/GitHub/movieRecommender/python/cosine_sim.npy')

def get_recommendation(movieTitle, cosine_sim=cosine_sim):
	index = df.loc[df['title'] == movieTitle].index[0]
	suggestions = list(enumerate(cosine_sim[index]))
	sugSorted = sorted(suggestions, key=lambda x: x[1], reverse=True)
	count = 0
	for index in sugSorted:
		if count == 5:
			break
		if df.loc[int(index[0])]['title'] == movieTitle:
			continue
		tmdbID = df.loc[int(index[0])]['id']
		imdbID = cdf.loc[cdf['tmdbId'] == tmdbID]['imdbId'].values[0]
		while len(str(imdbID)) < 7:
			imdbID = '0'+ str(imdbID)
		print(imdbID)
		count += 1

	return sugSorted

get_recommendation(sys.argv[1])

