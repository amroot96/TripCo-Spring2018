import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  createTable () {

      let distance = 0;  // need to sum this from real the trip
      
    let units = this.props.trip.options.distance;
    let dests = [];
    let dists = [];
    let i = 0;
    for(i=0; i < this.props.trip.places.length; i++) {
        dests[i] = <td key={i}>{this.props.trip.places[i].name}</td>;
        dists[i] = <td key={i}>{this.props.trip.distances[i]}</td>;
        distance = this.props.trip.distances[i] + distance;
    }
    return {distance, units, dests, dists};
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary">
          <h4>Round trip distance of {table.distance} {table.units}. </h4>
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
          </table>
        </div>
    )
  }
}

export default Itinerary;
