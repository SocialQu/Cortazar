# Recommendation Algorithm

## Brainstorm

* Get the top 100 stories by geo query.
* Render the top 10 stories using the full 512 dimensional tensors.
* Embed the vectors using a single sentence, not the aggregate.
* Store in the DB model the compressed embeddings of each story piece.
* Clusters? Prefilter by clusters.
* Tags? Additional filters after geoquery sorting.

