import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: { // default TFFI
        version: 2,
        type: "trip",
        title: "",
        options: {distance: "miles", optimization: "0"},
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      },
      query: "",
    };
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.plan = this.plan.bind(this);
  }

  fetchResponse() {
    let requestBody = this.state.trip;
    const serverURL = 'http://' + location.host + '/plan';
    console.log(serverURL);
    return fetch(serverURL, {
      method: "POST",
      body: JSON.stringify(requestBody)
    });
  }

  async plan() {
      console.log("Plan");
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      // console.log(tffi);
      this.updateTrip(tffi, 2);
    } catch (err) {
      console.error(err);
    }
  }

  updateTrip(json, init) {
    console.log("Update trip called");
    if (init === 1) {
      json.distances = new Array(json.places.length);
      //comment
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
    if(init === 1) {
      this.plan();
    }
    console.log(this.state.trip);
  }

  updateOptions(arg, str) {
    if (str === "distance") {
      let unitChange = Object.assign({}, this.state.trip);
      unitChange.options.distance = arg;
      this.setState({trip: unitChange});
      console.log(this.state.trip.options);
    }
    else {
      let unitChange = Object.assign({}, this.state.trip);
      unitChange.options.optimization = arg;
      this.setState({trip: unitChange});
      console.log(this.state.trip.options);
    }
    this.plan();
  }

  render() {
    return (
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
              <Destinations trip={this.state.trip}
                            updateTrip={this.updateTrip}/>
            </div>
            <div className="col-12">
              <Options options={this.state.trip.options}
                       updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
              <Trip trip={this.state.trip} plan={this.plan}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Application;