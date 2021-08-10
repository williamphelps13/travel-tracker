import './css/base.scss';
import MicroModal from 'micromodal';
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

window.addEventListener('load', openModal);

document.getElementById('openModalButton').addEventListener('click', openModal);

function openModal() {
  MicroModal.show('login-modal');
};

document.getElementById('loginButton').addEventListener('click', getIDFromUsername)


function getIDFromUsername() {
  const username = document.getElementById('usernameInput');
  const password = document.getElementById('passwordInput');

  traveler = new Traveler(username.value, password.value);
  // traveler = new Traveler('traveler44', 'travel');
  traveler.getIDFromUsername();

  
  if (password.value === "travel") {
    document.querySelector('.login-page').classList.add("hidden");
    document.querySelector('.user-page').classList.remove("hidden");
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

    trip = new Trip(allDestinations);

  }).then(displayDashboard);
}

function retrieveData() {
  return Promise.all([getData(`travelers/${traveler.id}`), getData('trips'), getData('destinations')]);
}

function displayDashboard() {
  traveler.travelerTrips = tripRepo.getTripsByID(traveler.id);
  
  sortTrips();
  traveler.getTotalSpentThisYear();

  addDestinations()

  document.getElementById('spent').innerText = traveler.totalSpentThisYear;

  renderTrips(traveler.pastTrips, 'tripsGridPast')
  renderTrips(traveler.currentOrNextTrip, 'tripsGridCurrent')
  renderTrips(traveler.upcomingTrips, 'tripsGridUpcoming')
  renderTrips(traveler.pendingTrips, 'tripsGridPending')
}

function sortTrips() {
  traveler.getPastTrips()
  traveler.getCurrentOrNextTrip()
  traveler.getUpcomingTrips()
  traveler.getPendingTrips()
}

function renderTrips(tripsList, section) {
  const tripsGrid = document.getElementById(`${section}`);
  tripsGrid.innerHTML = '';

  tripsList.forEach(trips => {
  let destinationName, imageURL, imageAlt;
  
  trip.allDestinations.forEach(destination => {
    if (trips.destinationID === destination.id) {
      destinationName = destination.destination;
      imageURL = destination.image;
      imageAlt= destination.alt;
    }
  })
    tripsGrid.innerHTML +=
   `<article class='trips'>
      <div class='trips-image-container'>
        <img class='trips-image' src=${imageURL} alt=${imageAlt}>
      </div>
      <p>Destination: ${destinationName}</p>
      <p>Date: ${trips.date}</p>
      <p>Duration: ${trips.duration}</p>
      <p>Status: ${trips.status}</p>
    </article>`
  })
}

function addDestinations() {
  trip.allDestinations.forEach(destination => {
    destinationInput.innerHTML += `
    <option value=${destination.id}>${destination.destination}</option>`
  })
}

document.getElementById('estimateButton').addEventListener('click', displayEstimate)
document.getElementById('submitButton').addEventListener('click', createTrip)

function displayEstimate() {
  event.preventDefault();

  addInputsToTrip()

  trip.getTripCost()
  trip.getAgentFee()
  trip.getTotalCost()

  document.getElementById('tripEstimate').innerText = trip.totalCost;
}

let destinationInput = document.getElementById('destinationsDropdown');
let dateInput = document.getElementById('startDate');
let durationInput = document.getElementById('duration');
let travelerCountInput = document.getElementById('party');

function createTrip() {
  event.preventDefault();

  destinationInput.value = "";
  dateInput.value = "";
  durationInput.value = "";
  travelerCountInput.value = "";

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