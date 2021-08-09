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

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be a instance of Traveler', () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should be able to store all destinations', () => {
    expect(trip.allDestinations).to.equal(destinations);
  });

  it('should be able to store a trip destination id from input', () => {
    expect(trip.destinationID).to.equal(1);
  });

  it('should be able to store a trip date input', () => {
    trip.date = '2021/08/13';
    
    expect(trip.date).to.equal('2021/08/13');
  });

  it('should be able to store a trip duration input', () => {
    expect(trip.duration).to.equal(7);
  });

  it('should be able to store a trip traveler count input', () => {
    expect(trip.travelerCount).to.equal(2);
  });

  it('trip status should be pending by default', () => {

    expect(trip.status).to.equal('pending');
  });

  it('should be able to calculate estimated trip cost', () => {
    trip.getTripCost();

    expect(trip.tripCost).to.equal(1780);
  });

  it('should be able to calculate agent fee', () => {

    trip.getTripCost();

    trip.getAgentFee();

    expect(trip.agentFee).to.equal(178);
  });

  it('should be able to calculate estimated total trip cost', () => {

    trip.getTripCost();
    
    trip.getAgentFee();
  
    trip.getTotalCost();

    expect(trip.totalCost).to.equal(1958);
  });
});
