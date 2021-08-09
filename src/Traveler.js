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

  getCurrentOrNextTrip() {
    this.currentOrNextTrip = this.travelerTrips.find(trip => {
      const dayAfterTrip = dayjs(trip.date).add(trip.duration, 'day');
      const dayBeforeTrip = dayjs(trip.date).subtract(1)

      return dayjs().isAfter(dayBeforeTrip) && dayjs().isBefore(dayAfterTrip);
    });

    if (!this.currentOrNextTrip) {
      this.currentOrNextTrip = this.travelerTrips.filter(trip => trip.status === 'approved' && dayjs(trip.date).isAfter(dayjs())).sort((a,b) => new Date(a.date) - new Date(b.date))[0];
    }
  }

  getUpcomingTrips() {
    this.upcomingTrips = this.travelerTrips.filter(trip => trip.status === 'approved' && dayjs(trip.date).isAfter(dayjs())).sort((a,b) => new Date(a.date) - new Date(b.date))
  }
  
  getPendingTrips() {
    this.pendingTrips = this.travelerTrips.filter(trip => trip.status === 'pending');
  }

  getTotalSpentThisYear() {
    const pastTripsThisYear = this.travelerTrips.filter(trip => dayjs(trip.date).isBefore(dayjs())).filter(trip => dayjs(trip.date).isAfter(dayjs('2020-12-31')))

    this.totalSpentThisYear = pastTripsThisYear.reduce((totalSpentThisYear, trip) => {
      this.destinations.forEach(destination => {
        if (trip.destinationID === destination.id) {
          totalSpentThisYear += (trip.duration * trip.travelers * destination.estimatedLodgingCostPerDay + trip.travelers * destination.estimatedFlightCostPerPerson);
        }
      })

      return totalSpentThisYear;
    }, 0)
  }
}

export default Traveler;