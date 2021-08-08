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








