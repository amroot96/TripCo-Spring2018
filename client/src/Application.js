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
    this.updateTrip = this.updateTrip.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateTrip(tffi){
    let dests = [];
    let dists = [];
    let i = 0;
    for(i=0;i<tffi.length;i++) {
      dests[i] = tffi[i].name;
    }
    for(i=0;i<tffi.length;i++) {
        dists[i] = tffi[i].elevation;
    }
    this.setState({
        trip:{
            type:"test",
            title: "Title_Test",
            options : {distance: "miles"},
            places: dests,
            distances: dists,
            map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
        }});
  }

  updateOptions(options){
    console.log(options);
    //This makes sense to me, maybe too simple
    this.setState({trip:{options : options}});
    // update the options in the trip.
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