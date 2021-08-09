import { expect } from 'chai';
import TripRepo from '../src/TripRepo.js';
import trips from '../src/test-data/allTrips.js';

describe('TripRepo', () => {
  let tripRepo, tripsOfSibby;

  beforeEach(() => {
    tripRepo = new TripRepo(trips);

    tripsOfSibby = [
      {
        id: 3,
        userID: 3,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      },
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
        id: 4,
        userID: 3,
        destinationID: 14,
        travelers: 2,
        date: "2022/02/25",
        duration: 10,
        status: "pending",
        suggestedActivities: [ ]
      },
      {
        id: 1,
        userID: 3,
        destinationID: 49,
        travelers: 1,
        date: "2021/08/07",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      },
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
  }); 

  it('should be a function', () => {
    expect(TripRepo).to.be.a('function');
  });

  it('should be a instance of Traveler', () => {
    expect(tripRepo).to.be.an.instanceOf(TripRepo);
  });

  it('should be able to store all trips', () => {
    expect(tripRepo.allTrips).to.equal(trips);
  });

  it('should be able to get a particular user\'s trips by their id', () => {
    const tripsOfID3 = tripRepo.getTripsByID(3)

    expect(tripsOfID3).to.deep.equal(tripsOfSibby);
  });
});
