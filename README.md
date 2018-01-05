
# Beersphere
Min P., Andrew L., Phillip W., Erin R.

### Purpose
 The website serves as a quick reference for users seeking a craft beer and its origin. In order to give the user a better feel for the type of taste the beer has, they will also find find food/recipes that are associated with the drink they look up. 

## What was used:
API: PunkApi.com, Fork2fork.com
CSS: Materialize, Sass for styling

## Challenges
PunkAPI had very limited requests, which held back implementing AJAX calls effectively. It also has a narrow list of brands, which would setback the user's experience since even common brands are left out. We initially used LikeBTN.com for an API to count "likes" for each beer in the site. However, the API itself was limited to its use as we struggled to get Firebase to save each individual counter of likes for each beer and remain permanent. 

## Possible changes:
Given that the user experience is limited to the search results that we initated, there's not much information for the user to find from each beer. That said, the rating system for each beer could be implemented in an alternative to Firebase or different APIs altogether. 

## Future developments:
Since out goal was to inform users about lesser-known beer compared to ones that can be easily found in any bar, we would need to have more API resources. Some of these could be BrewerDB, Google Maps, Yelp and map APIs to allow the user to locate harder-to-find beers quickly and efficently. 
In addition, features around building comments (via storage/Firebase) would also fit into our goal. Many beer sites use user-accounts and social media parties in order to build on each user's involvement, so in the future this would be a new focus in order to keep up with competition. Overall, there is a lot more to flesh out in terms of the site's features.