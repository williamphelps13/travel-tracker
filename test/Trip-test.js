import { expect } from 'chai';
import Trip from '../src/Trip.js';
import destinations from '../src/test-data/allDestinations.js';


describe('Trip', () => {
  let trip;

  beforeEach(() => {
    trip = new Trip(destinations);

    trip.destinationID = 1;
    trip.duration = 7;
    trip.travelerCount = 2;
  }); 

  
});
