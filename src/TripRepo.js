class TripRepo {
  constructor(allTrips) {
    this.allTrips = allTrips;
  }

  getTripsByID(id) {
    return this.allTrips.filter(trip => trip.userID === id).sort((a,b) => new Date(b.date) - new Date(a.date));
  }
}

export default TripRepo;