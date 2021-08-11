# Travel Tracker

## Summary / Goal
- Create a responsive, accessible, and beautful travel website that allows users to login to their account, see their past, present, and planned trips, and mostly importantly book a new trip!
- The project relies heavily on classes to store the travler's information as well as the trips they create and thus teh project also relies on test driven development to ensure the classes are working as desired
- Though this was a solo project it was important to reach out to our community to create a successful project including through pull requests


## Contributors
- [William Phelps](https://github.com/williamphelps13)

## Technologies / Architecture
- HTML
- SCSS
- JavaScript
- TDD w/ Chai and Mocha
- GlideJS
- DaysJS
- MicroModal

## Set Up
1. Fork this project to your Github account
2. Clone the repository to your local machine
3. cd into the project and open in text editor
4. Deploy link will be listed below

## How It Works
- Login with username and password: username - "traveler" followed by a number 1 to 50; password - "travel"
- Create your own trip!
- View Current trip (if today's date overlaps with a current trip) OR if no current trip the very next trip is displayed instead
- View Past trips
- View Pending trips (trips not yet approved by the travel agent)
- View Upcoming Trips (future trips that are not pending)

![recording (8)](https://user-images.githubusercontent.com/22990386/128966146-c1b64216-f808-49fe-8f50-f7f7bfba1393.gif)


## Future Additions
- Add more sad path testing
- Increase amount of error handling
- Use another carousel npm package to create a carousel for each slide
- Increase professional and pop of login page
- Add more color and dynamic character to main page

## Challenges
- GlideJS presented a number of confusing and undesired problems including when the login to dashboard page transition was created the dashboard would be blank until the screen was changed in size. The reason for this was that the GlideJS was global not attached to that page transition.
- GlideJS slightly negatively impacts the lighthouse accessbility score because it duplicates certain portions of the page to create the carousel effect and thus lighthouse thinks there are duplicate IDs

## Wins
- It was great to get GlideJS, Micromodal, and DateJS all working! 
- Leaning into a strong data model approach in which multitude of information was stored safely in the traveler and trip class
- I created extra methods such as breaking out the total cost of the trip into subtotal, travel fee, and grand total to potentially display all seperately on the page
- RenderTrips dom method is very dynamic

## Deploy Link
- Server must be run locally so no deploy link applicable
