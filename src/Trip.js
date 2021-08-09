import dayjs from 'dayjs';

class Trip {
  constructor(allDestinations) {
    this.allDestinations = allDestinations;
    this.destinationID = null;
    this.date = null;
    this.duration = null;
    this.travelerCount = null;
    this.status = 'pending';
    this.tripCost = null;
    this.agentFee = null;
    this.totalCost = null;
  }
  
  getTripCost() {
    this.tripCost = this.allDestinations.reduce((tripCost, destination) => {
      if (this.destinationID === destination.id) {
        tripCost = this.duration * this.travelerCount * destination.estimatedLodgingCostPerDay + this.travelerCount * destination.estimatedFlightCostPerPerson;
      }

      return tripCost;
    }, 0)
  }

  getAgentFee() {
    this.agentFee = this.tripCost * .1
  }

  getTotalCost() {
    this.totalCost = this.tripCost + this.agentFee;
  }
}

export default Trip;