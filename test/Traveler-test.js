import { expect } from 'chai';
import Traveler from '../src/Traveler.js';
import TripRepo from '../src/TripRepo.js';
import trips from '../src/test-data/allTrips.js';
import destinations from '../src/test-data/allDestinations.js';

describe('Traveler', () => {
    let traveler, travelerData, tripRepo, pastTripsOfSibby, currentTripOfSibby, nextTripOfSibby, upcomingTripsOfSibby, pendingTripOfSibby;

  beforeEach(() => {
    const username = 'traveler3';
    const password = 'travel';

    traveler = new Traveler(username, password);
    traveler.getIDFromUsername();

    travelerData = {
      id: 3,
      name: 'Sibby Dawidowitsch',
      travelerType: 'shopper'
      };

    tripRepo = new TripRepo(trips);
    
    traveler.travelerTrips = tripRepo.getTripsByID(traveler.id);

    pastTripsOfSibby = [
      {
        id: 41,
        userID: 3,
        destinationID: 25,
        travelers: 3,
        date: "2021/04/30",
        duration: 11,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 102,
        userID: 3,
        destinationID: 3,
        travelers: 3,
        date: "2021/03/26",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 50,
        userID: 3,
        destinationID: 16,
        travelers: 5,
        date: "2020/07/02",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 173,
        userID: 3,
        destinationID: 9,
        travelers: 6,
        date: "2020/04/21",
        duration: 18,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 65,
        userID: 3,
        destinationID: 35,
        travelers: 4,
        date: "2020/03/21",
        duration: 18,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 121,
        userID: 3,
        destinationID: 44,
        travelers: 2,
        date: "2020/03/11",
        duration: 13,
        status: "approved",
        suggestedActivities: [ ]
      }
    ]

    currentTripOfSibby = {
      id: 1,
      userID: 3,
      destinationID: 49,
      travelers: 1,
      date: "2021/08/07",
      duration: 8,
      status: "approved",
      suggestedActivities: [ ]
    };

    nextTripOfSibby = {
        id: 5,
        userID: 3,
        destinationID: 29,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [ ]
    };

    upcomingTripsOfSibby = [
      {
        id: 5,
        userID: 3,
        destinationID: 29,
        travelers: 3,
        date: "2022/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 3,
        userID: 3,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      }
      ]
      
      pendingTripOfSibby = [
        {
          id: 4,
          userID: 3,
          destinationID: 14,
          travelers: 2,
          date: "2022/02/25",
          duration: 10,
          status: "pending",
          suggestedActivities: [ ]
        }
      ]

  }); 

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be a instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should be able to store a username', () => {
    expect(traveler.username).to.equal('traveler3');
  });

  it('should be able to store a password', () => {
    expect(traveler.password).to.equal('travel');
  });

  it('should be able to store an id', () => {
    traveler.id = travelerData.id;

    expect(traveler.id).to.equal(3);
  });

  it('should be able to store a name', () => {
    traveler.name = travelerData.name;

    expect(traveler.name).to.equal('Sibby Dawidowitsch');
  });

  it('should be able to store traveler type', () => {
    traveler.travelerType = travelerData.travelerType;

    expect(traveler.travelerType).to.equal('shopper');
  });

  it('should be able to store all the traveler\'s trips', () => {
    expect(traveler.travelerTrips).to.deep.equal(tripRepo.getTripsByID(traveler.id));
  });

  it('should be able to store all destinations', () => {
    traveler.destinations = destinations;
    
    expect(traveler.destinations).to.deep.equal(destinations);
  });

  it('should be able to reassign the id to a string of the id', () => {
    traveler.getIDFromUsername();

    expect(traveler.id).to.equal(3);
  });

  it('should be able to reassign pastTrips to all trips before today', () => {
    traveler.getPastTrips();

    expect(traveler.pastTrips).to.deep.equal(pastTripsOfSibby);
  });

  it('should be able to reassign currentOrNextTrip to the current trip', () => {

    traveler.getCurrentOrNextTrip();

    expect(traveler.currentOrNextTrip).to.deep.equal(currentTripOfSibby);
  });

  // it('should be able to reassign currentOrNextTrip to the next trip after today that is not pending if no current trip exists', () => {
  //   currentTripOfSibby = null;

  //   traveler.getCurrentOrNextTrip();

  //   expect(traveler.currentOrNextTrip).to.deep.equal(nextTripOfSibby);
  // });

  
  
});