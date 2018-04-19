import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';
import cookie from 'react-cookies';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: { // default TFFI
        version: 3,
        type: "trip",
        title: "Name your trip here...",
        options: {
          distance: cookie.load('distance'),
          userUnit: cookie.load("userDistance"),
          userRadius: cookie.load("userRadius"),
          optimization: cookie.load('optimization'),
        },
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      },
      query: "",

    };
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.plan = this.plan.bind(this);
    this.removePlace = this.removePlace.bind(this);
    this.makeStart = this.makeStart.bind(this);
  }


  fetchResponse() {
    let requestBody = this.state.trip;
    console.log(requestBody);
    const serverURL = 'http://' + location.host + '/plan';
    console.log(serverURL);
    return fetch(serverURL, {
      method: "POST",
      body: JSON.stringify(requestBody)
    });
  }

  async plan() {
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      this.updateTrip(tffi, 2);
    } catch (err) {
      console.error(err);
    }
  }

  updateTrip(json, init) {
    if (init === 1) {
      json.distances = new Array(json.places.length);
    }
    if(json.options == null) {
      json.options = {
        distance: "miles",
        userUnit: " ",
        userRadius: " ",
        optimization: "0"
      }
    }
    this.setState({
      trip: {
        version: json.version,
        type: json.type,
        title: json.title,
        options: json.options,
        places: json.places,
        distances: json.distances,
        map: json.map
      }
    });
    if (init === 1) {
      this.plan();
    }
  }

  updateOptions(arg, str) {
    if (str === "distance") {
      let unitChange = Object.assign({}, this.state.trip);
      unitChange.options.distance = arg;
      unitChange.options.optimization = "0";
      this.setState({trip: unitChange});
    }
    else {
      let unitChange = Object.assign({}, this.state.trip);
      unitChange.options.optimization = arg;
      this.setState({trip: unitChange});
    }
    cookie.save('distance',this.state.trip.options.distance);
    cookie.save('optimization',this.state.trip.options.optimization);
    cookie.save('userRadius',this.state.trip.options.userRadius);
    cookie.save('userUnit',this.state.trip.options.userUnit);
    console.log("Cookie: "+cookie.load('distance'));
    console.log("Cookie: "+cookie.load('optimization'));
    console.log("Cookie: "+cookie.load('userRadius'));
    console.log("Cookie: "+cookie.load('userUnit'));
    this.plan();
  }

  removePlace(index) {
    index = index.target.value;
    let newPlaces = this.state.trip.places;
    if (index == this.state.trip.places.length - 1 || index == 0) {
      newPlaces.splice(index, 1);
      newPlaces.splice(0, 1);
    }
    else {
      newPlaces.splice(index, 1);
    }
    this.setState({
      trip: {
        version: this.state.trip.version,
        type: this.state.trip.type,
        title: this.state.trip.title,
        options: this.state.trip.options,
        places: newPlaces,
        distances: this.state.trip.distances,
        map: this.state.trip.map
      }
    });
    this.plan();
  }

  makeStart(index) {
    index = index.target.value;
    let newPlaces = this.state.trip.places;
    if (!(index == this.state.trip.places.length - 1 || index == 0)) {
      newPlaces[0] = newPlaces[index];
      newPlaces.splice(index, 1);
    }
    this.setState({
      trip: {
        version: this.state.trip.version,
        type: this.state.trip.type,
        title: this.state.trip.title,
        options: {
          distance: this.state.trip.options.distance,
          userUnit: this.state.trip.options.userUnit,
          userRadius: this.state.trip.options.userRadius,
          optimization: "0"
        },
        places: newPlaces,
        distances: this.state.trip.distances,
        map: this.state.trip.map
      }
    });
    this.plan();
  }

  render() {
    return (
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
              <Destinations trip={this.state.trip}
                            updateTrip={this.updateTrip} plan={this.plan}/>
            </div>
            <div className="col-12">
              <Options options={this.state.trip.options}
                       updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
              <Trip trip={this.state.trip} plan={this.plan}
                    removePlace={this.removePlace} makeStart={this.makeStart}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Application;