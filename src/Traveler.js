import dayjs from 'dayjs';

class Traveler {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.id = null;
    this.name = null;
    this.travelerType = null;
    this.travelerTrips = null;
    this.pastTrips = [];
    this.nextTrip = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
    this.totalSpentThisYear = 0;
  }

  getIDFromUsername() {
    this.id = this.username.replace(/\D/g, "");
  }

  // getPastTrips() {

  // }

  // getNextTrip() {

  // }

  // getUpcomingTrips() {

  // }

  // getPendingTrips() {

  // }

  // getTotalSpentThisYear() {
  //   return travelerTrips.reduce((totalSpentThisYear, trip) => {


  //     return totalSpentThisYear;
  //   }, 0)
  }
}