# Cloud Functions

## Fetch Tweets

**Paramaters:** OAuthToken & OAuthVerifier

**Output:** 10 Latest Tweets & User Doc

- If User exists returns saved stories.
- If User exists but token is invalid, updates user document.

- If User doesn not exist gets Token Key & Secret
- Connects to Twitter API & fetches latest 10 tweets.
- Saves User Document on DB.

- Returns Output.

**Errors:**

* Could not connect to Twitter API 
* Could not Fetch Tweets.
* Could not connect to DB.
* Other error.

* * * 


## Find Stories

**Paramaters:** UserID, Center & {Search}

**Output:**  Stories, RecommendationId.

- Gets user, verifies limit.
- Calls Stories Aggregation Pipeline => Gets 10 - 50 Stories.
- Creates Recommendation Record (with search if available).
- Updates User Doc (limit).
- Returns Output.

If user is Demo:
- Verifies availability.
- Updates Limit based on ellapsed time. 

**Errors:**

* User has no more available searches.
* Stories could not be retrieved,

* * * 


## Get User

**Parameters:** UserID

**Output:** User Record

- Verifies & Fetches User.
- Returns User with Stories.

**Errors:** User does not exist or could not be fetched.

* * * 


## Save Email

**Parameters:** Email, Center & Sentence.

**Output:** Success

- Stores Email
- Returns 200

**Errors:** Could not connect to DB. 

* * * 
