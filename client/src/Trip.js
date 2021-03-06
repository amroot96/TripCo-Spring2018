import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      kmlFile: "",
    };
    this.saveTFFI = this.saveTFFI.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */

  /* Saves the map and itinerary to the local file system.
   */
  saveTFFI() {
    console.log("save button");
    let help = this.props.trip.map;
    this.props.trip.map = "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>";
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify(this.props.trip));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", document.getElementById(
        "titleBox").value + ".json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    this.props.trip.map = help;
  }

  updateTitle() {
    this.props.trip.title = document.getElementById("titleBox").value;
    this.saveTFFI();
  }

  reverseTrip() {
    console.log("reverse trip");
    this.props.trip.places.reverse();
    this.props.trip.distances.reverse();
    this.props.plan();
  }

  reverseButton() {
    return (
          <button className="btn" style={{background: '#C8C372'}}
                  onClick={this.reverseTrip} type="button">Reverse Trip
          </button>
    )
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render() {
    return (
        <div id="trip" className="card">
          <div className="card-header text-white"
               style={{background: '#1E4D2B'}}>Trip
          </div>
          <div className="card-body">
            <div className="input-group" role="group">
              <input id="titleBox" type="text" className="form-control"
                     placeholder={this.props.trip.title}/>
              <span className="input-group-btn">
                              <button className="btn btn"
                                      style={{background: '#C8C372'}}
                                      onClick={this.updateTitle}
                                      type="button">Save</button>
                          </span>
            </div>
            <Map trip={this.props.trip} kmlFile={this.state.kmlFile}/></div>
            <Itinerary trip={this.props.trip}
                       removePlaces={this.props.removePlace}
                       makeStart={this.props.makeStart}/>
            <div className="input-group-btn">
                {this.reverseButton()}
            </div>
        </div>
    )
  }
}

export default Trip;