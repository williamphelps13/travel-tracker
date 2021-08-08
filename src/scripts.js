
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import './css/base.scss';
import MicroModal from 'micromodal';
import Glide from '@glidejs/glide';

// const loginButton = document.getElementById('login-button');
// loginButton.addEventListener('click', openModal);
window.addEventListener('load', openModal);

function openModal() {
  MicroModal.show('login-modal');
};

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





