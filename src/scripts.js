import './css/base.scss';
import Glide from '@glidejs/glide';
import dayjs from 'dayjs';
import Traveler from './Traveler'
import TripRepo from './TripRepo'
import Trip from './Trip'
import {getData, postData} from './apiCalls';
import domUpdates from './domUpdates';

const config = {
  type: 'carousel',
  perView: 2,
  gap: 20,
  animationDuration: 500,
  focusAt: 'center',
  breakpoints: {
    480: {
      perView: 1
    }
  }
};

let tripRepo, traveler, trip;

let {
  username,
  password,
  destinationInput,
  dateInput,
  durationInput,
  travelerCountInput,
} = domUpdates;

window.addEventListener('load', displayModal);
document.getElementById('openModalButton').addEventListener('click', displayModal);

// function displayHistoricalWeek(randomHistory) {
//   domUpdates.renderHistoricalWeek(randomHistory);
// }
// const {
//   hydrationButton,
//   hydrationInput,
//   hydrationHeader
// } = domUpdates;

function displayModal() {
  domUpdates.renderModal()
}

document.getElementById('loginButton').addEventListener('click', getIDFromUsername)


function getIDFromUsername() {
  traveler = new Traveler(username.value, password.value);
  // traveler = new Traveler('traveler44', 'travel');
  traveler.getIDFromUsername();

  if (password.value === 'travel') {
    domUpdates.renderHideLogin();
    new Glide('.glide', config).mount();
    distributeData();
  }
}

function distributeData() {
  retrieveData().then(promiseArray => {
    const travelerData = promiseArray[0];
    const allTrips = promiseArray[1].trips;
    const allDestinations = promiseArray[2].destinations;
    
    tripRepo = new TripRepo(allTrips);

    traveler.name = travelerData.name;
    traveler.travelerType = travelerData.travelerType;
    traveler.destinations = allDestinations;
    traveler.travelerTrips = tripRepo.getTripsByID(traveler.id);

    trip = new Trip(allDestinations);

  }).then(displayDashboard);
}

function retrieveData() {
  return Promise.all([getData(`travelers/${traveler.id}`), getData('trips'), getData('destinations')]);
}

function displayDashboard() {
  sortTrips();

  traveler.getTotalSpentThisYear();
  domUpdates.renderTotalSpentThisYear(traveler);

  domUpdates.renderDestinations(trip);

  domUpdates.renderTrips(traveler.pastTrips, 'tripsGridPast', trip)
  domUpdates.renderTrips(traveler.currentOrNextTrip, 'tripsGridCurrent', trip)
  domUpdates.renderTrips(traveler.upcomingTrips, 'tripsGridUpcoming', trip)
  domUpdates.renderTrips(traveler.pendingTrips, 'tripsGridPending', trip)
}

function sortTrips() {
  traveler.getPastTrips()
  traveler.getCurrentOrNextTrip()
  traveler.getUpcomingTrips()
  traveler.getPendingTrips()
}

document.getElementById('estimateButton').addEventListener('click', displayEstimate)
document.getElementById('submitButton').addEventListener('click', createTrip)

function displayEstimate() {
  event.preventDefault();

  addInputsToTrip()

  trip.getTripCost()
  trip.getAgentFee()
  trip.getTotalCost()

  domUpdates.renderTripCost(trip);
}

function createTrip() {
  event.preventDefault();

  domUpdates.clearInputs();

  let tripToPost = {
    id: tripRepo.allTrips.sort((a,b) => b.id - a.id)[0].id + 1,
    userID: traveler.id,
    destinationID: trip.destinationID,
    travelers: trip.travelerCount,
    date: dayjs(trip.date).format('YYYY/MM/DD'),
    duration: trip.duration,
    status: trip.status,
    suggestedActivities: [ ]
  }

  postTrip(tripToPost);
}

function addInputsToTrip() {
  trip.destinationID = parseInt(destinationInput.value);
  trip.date = dateInput.value;
  trip.duration = parseInt(durationInput.value);
  trip.travelerCount = parseInt(travelerCountInput.value);
}

function postTrip(tripToPost) {
  postData(tripToPost).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      distributeData();
      displayDashboard();
    }
  })
  .catch(error => {
    // .innerText = "Could not Fetch :( Check Internet?";
    console.log(error)
  })
}