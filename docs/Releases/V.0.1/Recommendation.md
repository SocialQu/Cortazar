# Recommendation Algorithm

## Brainstorm

* Get the top 100 stories by geo query.
* Render the top 10 stories using the full 512 dimensional tensors.
* Embed the vectors using a single sentence, not the aggregate.
* Store in the DB model the compressed embeddings of each story piece.
* Clusters? Prefilter by clusters.
* Tags? Additional filters after geoquery sorting.
* Consider other distances? Euclidean.


## Implementation Steps

1. [X] Get function to capture all the stories from files.
2. [X] Analyzed all stories, update the algorithm.
3. [X] Update DB documents.
4. [ ] MongoDB aggregation pipeline query.
5. [ ] Absolute Value distance.
6. [X] Test every story has been updated.
