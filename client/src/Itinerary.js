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
        dests[i] = <td>{this.props.trip.places[i].name}</td>;
        dists[i] = <td>{this.props.trip.places[i].latitude}</td>;
    }
    //let dests = this.props.trip.places.map((item) => <td>{item}</td>);
    //let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    return {distance, units, dests, dists};
  }

  render() {
    let table = this.createTable();

    return(
        <div id="itinerary">
          <h4>Round trip distance of {table.distance} {table.units}. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-info">
              <th className="align-middle">Destination</th>
              {table.dests}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-info align-middle">Latitude</th>
              {table.dists}
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Itinerary;
