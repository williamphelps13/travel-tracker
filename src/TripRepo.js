class TripRepo {
  constructor(allTrips) {
    this.allTrips = allTrips;
  }

  getTripsByID(id) {
    return this.allTrips.filter(trip => trip.userID === id)
  }
}