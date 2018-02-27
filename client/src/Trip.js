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

    this.plan = this.plan.bind(this);
    this.saveTFFI = this.saveTFFI.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
      let requestBody = this.props.trip;
      // console.log(process.env.SERVICE_URL);
      // console.log(requestBody);
      const serverURL = 'http://' + location.host + '/plan';
      console.log(serverURL);
      return fetch(serverURL, {
          method:"POST",
          body: JSON.stringify(requestBody)
      });
  }
  async plan(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      // console.log(tffi);
      this.props.updateTrip(tffi,2);
    } catch(err) {
      console.error(err);
    }
  }

  /* Saves the map and itinerary to the local file system.
   */
  saveTFFI(){
      console.log("save button");
      let help = this.props.trip.map;
      this.props.trip.map = "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>";
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.trip));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", this.props.trip.title + ".json");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      this.props.trip.map = help;
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
        <div id="trip" className="card">
          <div className="card-header bg-success text-white">
            Trip
          </div>
          <div className="card-body">
            <p>Give your trip a title before planning or saving.</p>
              <Itinerary trip={this.props.trip} />
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-info " onClick={this.plan} type="button">Plan</button>
            </span>
              <input type="text" className="form-control" placeholder="Trip title..."/>
              <span className="input-group-btn">
              <button className="btn btn-info " onClick={this.saveTFFI} type="button">Save</button>
            </span>
            </div>
            <Map trip={this.props.trip} />

          </div>
        </div>
    )
  }
}

export default Trip;