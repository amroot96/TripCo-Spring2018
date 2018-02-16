import React, {Component} from 'react';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      trip: { // default TFFI
        type: "trip",
        title: "",
        options : {distance: "miles"},
        places: [],
        distances: [],
        map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
      }
    };
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
  }

  updateTrip(json,init){
      console.log("Update trip called");
      if(init === 1) {
          json.distances = [0,0,0];
      }
    this.setState({
        trip:{
            type:json.type,
            title: json.title,
            options : json.options,
            places: json.places,
            distances: json.distances,
            map: json.map
        }});
    console.log(this.state.trip);
  }


  updateOptions(arg) {
      let unitChange = Object.assign({}, this.state.trip);
      unitChange.options.distance = arg;
      this.setState({trip: unitChange});
      console.log(this.state.trip.options);
  }


  render() {
    return(
        <div id="application" className="container">
          <div className="row">
            <div className="col-12">
                <Options options={this.state.trip.options} updateOptions={this.updateOptions}/>
            </div>
            <div className="col-12">
                <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
            </div>
            <div className="col-12">
                <Trip trip={this.state.trip} updateTrip={this.updateTrip} />
            </div>
          </div>
        </div>
    )
  }
}

export default Application;