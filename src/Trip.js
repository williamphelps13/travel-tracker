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
  
}

export default Trip;