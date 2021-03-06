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
          distance: "miles",
          userUnit: " ",
          userRadius: " ",
          optimization: "0"
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
    this.setOptions = this.setOptions.bind(this);
    this.updateServerHost = this.updateServerHost.bind(this);
    this.currentState = this.state;
    this.serverHost = this.props.serverHost;
    if(cookie.load('options') == "set"){
        this.setOptions();
    }
  }

  setOptions(){
    if(cookie.load('distance')!= ''){
      this.state.trip.options.distance = cookie.load('distance');
    }

    if(cookie.load('userUnit')!= ''){
          this.state.trip.options.userUnit = cookie.load('userUnit');
    }

    if(cookie.load('userRadius')!= ''){
          this.state.trip.options.userRadius = cookie.load('userRadius');
    }

    if(cookie.load('optimization')!= ''){
          this.state.trip.options.optimization = cookie.load('optimization');
    }
  }

  fetchResponse() {
    let requestBody = this.state.trip;
    console.log(requestBody);
    const serverURL = this.serverHost + '/plan';
    console.log(serverURL);
    return fetch(serverURL, {
      header: {'Access-Control-Allow-Origin':'*'},
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
    cookie.save('options','set');
    cookie.save('distance',this.state.trip.options.distance);
    cookie.save('optimization',this.state.trip.options.optimization);
    cookie.save('userRadius',this.state.trip.options.userRadius);
    cookie.save('userUnit',this.state.trip.options.userUnit);
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

  updateServerHost(){
    this.currentState = this.state;
    console.log(document.getElementById("server").value);
    this.props.updateServer(document.getElementById("server").value);
    this.serverHost = 'http://' + document.getElementById("server").value;
    this.setState(this.currentState);
    this.plan();

  }

  serverOptionsUI(){
    return(
        <div className="card">
          <div className="card-header text-white"
               style={{background: '#1E4D2B'}}>Server Options
          </div>
          <div className="card-body"> Input a different server.
            <input type="txt" className="form-control" id="server" placeholder="Format: <black-bottle.cs.colostate.edu:port>"/>
            <button className="btn btn" style={{background:'#C8C372'}} type="button" onClick={this.updateServerHost}>Switch</button>
          </div>
        </div>
    )
  }

  render() {
    return (
        <div id="application">
          <div id="Optionsgroup" className="card-group">
            <div className="card">
              <Destinations trip={this.state.trip}
                            updateTrip={this.updateTrip} plan={this.plan}
                            serverHost={this.props.serverHost}/>
              <Options options={this.state.trip.options}
                       updateOptions={this.updateOptions}/>
                {this.serverOptionsUI()}
            </div>
             <div className="card">
              <Trip trip={this.state.trip} plan={this.plan}
                    removePlace={this.removePlace} makeStart={this.makeStart}/>
          </div>
        </div>
        </div>
    )
  }
}

export default Application;