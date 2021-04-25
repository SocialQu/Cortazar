# Recommendation Algorithm

## Brainstorm

* Get the top 100 stories by geo query.
* Render the top 10 stories using the full 512 dimensional tensors.
* Embed the vectors using a single sentence, not the aggregate.
* Store in the DB model the compressed embeddings of each story piece.
* Clusters? Prefilter by clusters.
* Tags? Additional filters after geoquery sorting.
* Consider other distances? Euclidean.
* Multiple centers? based on the query type? Use this in conjuction to clustering the initial query. This adds visualization possibilities.


## Training Implementation

1. [X] Get function to capture all the stories from files.
2. [X] Analyzed all stories, update the algorithm.
3. [X] Update DB documents.
4. [X] MongoDB aggregation pipeline query.
5. [X] Absolute Value distance.
6. [X] Test every story has been updated.


## Making a Recommendation

1. [X] Embed a Tweet with TensorFlow.
2. [X] Find the center of the tweet.
3. [X] Call the MongoDB Aggregation query.
4. [X] Sort top 10 Stories using Absolute Distance.
