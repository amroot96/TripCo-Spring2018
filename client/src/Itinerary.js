import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  createTable() {
    let distance = 0;  // need to sum this from real the trip
    let units = this.props.trip.options.distance;
    let dests = [];
    let dists = [];
    let buts = [];
    let i = 0;
    for (i = 0; i < this.props.trip.places.length; i++) {
      dests[i] = <td key={i}>{this.props.trip.places[i].name}</td>;
      dists[i] = <td key={i}>{this.props.trip.distances[i]}</td>;
      buts[i] = <td key={i}><button id={i} value={i} className="button" onClick={this.props.makeStart}>Start</button>
        <button id={i} value={i} className="button" onClick={this.props.removePlaces}>Remove</button></td>;
      distance = this.props.trip.distances[i] + distance;
    }
    return {distance, units, dests, dists,buts};
  }

  render() {
    let table = this.createTable();

    return (
        <div id="itinerary">
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
          </table>
        </div>
    )
  }
}

export default Itinerary;
