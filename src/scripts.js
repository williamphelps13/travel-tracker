// IMPORTS
import './css/base.scss';
import MicroModal from 'micromodal';
import Glide from '@glidejs/glide';
import dayjs from 'dayjs';
import Traveler from './Traveler'
import TripRepo from './TripRepo'
import Trip from './Trip'
import {getData, postData} from './apiCalls';
import domUpdates from './domUpdates';

// GLIDEJS
const config = {
  type: 'carousel',
  perView: 2,
  gap: 20,
  animationDuration: 500,
  focusAt: 'center',
  breakpoints: {
    800: {
      perView: 2
    },
    480: {
      perView: 1
    }
  }
};

new Glide('.glide', config).mount();

//GlOBAL VARIABLES
let tripRepo, traveler, trip;

//LOGIN PAGE
window.addEventListener('load', openModal);
const openModalButton = document.getElementById('open-modal-button');
openModalButton.addEventListener('click', openModal);

function openModal() {
  MicroModal.show('login-modal');
};

//GET DATA FROM LOGIN
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', getIDFromUsername)

function getIDFromUsername() {
  const username = document.getElementById('username-input');
  const password = document.getElementById('password-input');

  traveler = new Traveler(username.input, password.input);
  traveler.getIDFromUsername();
  // distributeData();
}

//GET DATA FROM API
function retrieveData() {
  return Promise.all([getData('travelers/${traveler.id}'), getData('trips'), getData('destinations')]);
}

//DISTRIBUTE DATA TO GLOBAL VARIABLES
function distributeData() {
  retrieveData().then(promiseArray => {
    const travelerData = promiseArray[0]
    const allTrips = promiseArray[1].trips;
    const destinations = promiseArray[2].destinations;
    
    tripRepo = new TripRepo(allTrips);

    traveler.name = travelerData.name;
    traveler.travelerType = travelerData.travelerType;
    traveler.travelerTrips = tripRepo.getTripsByID(traveler.id)

  }).then(displayDashboard);
}






