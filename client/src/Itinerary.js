import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: false,
      long: false
    };
    this.createTable = this.createTable.bind(this);
    this.lat = this.lat.bind(this);
    this.long = this.long.bind(this);
  }

  createTable() {
    let distance = 0;  // need to sum this from real the trip
    let units = this.props.trip.options.distance;
    let dests = [];
    let dists = [];
    let buts = [];
    let lats = [];
    let longs = [];
    let i = 0;
    for (i = 0; i < this.props.trip.places.length; i++) {
      dests[i] = <td key={i}>{this.props.trip.places[i].name}</td>;
      dists[i] = <td key={i}>{this.props.trip.distances[i]}</td>;
      lats[i] = <td key={i}>{this.props.trip.places[i].latitude}</td>;
      longs[i] = <td key={i}>{this.props.trip.places[i].longitude}</td>;
      buts[i] = <td key={i}><button id={i} value={i} className="button" onClick={this.props.makeStart}>Start</button>
        <button id={i} value={i} className="button" onClick={this.props.removePlaces}>Remove</button></td>;
      distance = this.props.trip.distances[i] + distance;
    }
    return {distance, units, dests, dists,buts,lats,longs};
  }
  lat(event) {
    if(event.target.checked) {
      this.setState({lat : true});
    }
    else {
      this.setState({lat : false});
    }
  }
  long(event) {
    if(event.target.checked) {
      this.setState({long : true});
    }
    else {
      this.setState({long : false});
    }
  }
  render() {
    let table = this.createTable();
    const rendlats = this.state.lat;
    const rendlongs = this.state.long;
    return (
        <div id="itinerary">
          Latitude: <input type="checkbox" id="lat"  onClick={this.lat}></input>
          Longitude: <input type="checkbox" id="long"  onClick={this.long}></input>
          <h4>Round trip distance of {table.distance} {table.units.split(" ")[0]}. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-outline-dark">
              <th className="align-middle">Destination</th>
              {table.dests}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-outline-dark align-middle">Distances</th>
              {table.dists}
            </tr>
            </tbody>
            <tbody>
            <tr>
              <th className="table-outline-dark align-middle">Options</th>
              {table.buts}
            </tr>
            </tbody>
            {rendlats ? (
                <tbody>
                <tr>
                  <th className="table-outline-dark align-middle">Latitude</th>
                  {table.lats}
                </tr>
                </tbody>):(null)}
            {rendlongs ? (
                <tbody>
                <tr>
                  <th className="table-outline-dark align-middle">Longitude</th>
                  {table.longs}
                </tr>
                </tbody>):(null)}
          </table>
        </div>
    )
  }
}

export default Itinerary;
