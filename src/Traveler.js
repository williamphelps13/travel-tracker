import dayjs from 'dayjs';

class Traveler {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.id = null;
    this.name = null;
    this.travelerType = null;
    this.travelerTrips = null;
    this.destinations = null;
    this.pastTrips = [];
    this.currentOrNextTrip = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
    this.totalSpentThisYear = 0;
  }

  getIDFromUsername() {
    const idString = this.username.replace(/\D/g, "");
    this.id = parseFloat(idString);
  }

  getPastTrips() {
    this.pastTrips = this.travelerTrips.filter(trip => dayjs(trip.date).add(trip.duration, 'day').isBefore(dayjs())).sort((a,b) => new Date(b.date) - new Date(a.date));
  }


}

export default Traveler;