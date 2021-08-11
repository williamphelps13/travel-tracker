import MicroModal from 'micromodal';

const domUpdates = {
  // renderHistoricalWeek(randomHistory) {
  //   const historicalWeek = document.querySelectorAll('.historicalWeek');
  //   historicalWeek.forEach(element => element.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  // },

  // hydrationButton: document.getElementById('hydrationSubmitButton'),
  // hydrationInput: document.getElementById('numOunces'),
  // hydrationHeader: document.getElementById('hydrationFormHeader'),

  username: document.getElementById('usernameInput'),
  password: document.getElementById('passwordInput'),
  destinationInput: document.getElementById('destinationsDropdown'),
  dateInput: document.getElementById('startDate'),
  durationInput: document.getElementById('duration'),
  travelerCountInput: document.getElementById('party'),
  
  renderModal() {
    MicroModal.show('login-modal');
  },

  renderHideLogin() {
    document.querySelector('.login-page').classList.add("hidden");
    document.querySelector('.user-page').classList.remove("hidden");
  },

  renderTotalSpentThisYear(traveler) {
    document.getElementById('spent').innerText = traveler.totalSpentThisYear;
  },
  
  renderTrips(tripsList, section, trip) {
    const tripsGrid = document.getElementById(`${section}`);
    tripsGrid.innerHTML = '';
  
    tripsList.forEach(sortedTrip => {
    let destinationName, imageURL, imageAlt;
    
    trip.allDestinations.forEach(destination => {
      if (sortedTrip.destinationID === destination.id) {
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
          <p>Date: ${sortedTrip.date}</p>
          <p>Duration: ${sortedTrip.duration}</p>
          <p>Status: ${sortedTrip.status}</p>
        </article>`
    })
  },

  renderDestinations(trip) {
    trip.allDestinations.forEach(destination => {
      this.destinationInput.innerHTML += `
      <option value=${destination.id}>${destination.destination}</option>`
    })
  },

  renderTripCost(trip) {
    document.getElementById('tripEstimate').innerText = trip.totalCost;
  },

  clearInputs() {
    this.destinationInput.value = "";
    this.dateInput.value = "";
    this.durationInput.value = "";
    this.travelerCountInput.value = "";
  },
}

export default domUpdates;