import React, {Component} from 'react';
import TripMap from './TripMap';

/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class Map extends Component {
  constructor(props){
    super(props);
  }

  render() {
   {
      let svgHeader='data:image/svg+xml;charset=UTF-8,';
      let svgData = this.props.trip.map;

      return (
          <div>
            <TripMap trip={this.props.trip}/>
          </div>
      )
    }
  }
}

export default Map;