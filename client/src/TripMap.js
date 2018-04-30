/* To use this file we will need to...
 * npm install --save recompose react-google-maps
 * npm install --save xmlbuilder
*/

import React, {Component} from 'react'
import {compose, withProps} from 'recompose'
import {
  withScriptjs, withGoogleMap,
  GoogleMap, Polyline, Marker
} from 'react-google-maps'

class InnerMap extends React.Component {
  constructor(props) {
    super(props);
    this.pointPath = [];
    this.kmlFile= "";
  }

  // react-google-maps expects all of it's data in the form {lat: x, lng: y}
  // more information can be found at https://tomchentw.github.io/react-google-maps/#introduction
  // IMPORTANT: since our trip.places array contains strings, we'll need to convert them somewhere in this
  //  class. I'll leave that to you (it only works since I've hard coded lat/lng in places as Numbers)

  // Create our path from the places array
  makePath(places) {
    let path = places.map(
        x => ({lat: Number(x.latitude), lng: Number(x.longitude)})
    );
    path.push(
        {lat: Number(places[0].latitude), lng: Number(places[0].longitude)});
    this.pointPath = path;
    return path;
  }

  // Create our markers
  makeMarkers(places) {
    let markers = [];
    for (let i = 0; i < places.length; i++) {
      markers[i] = <Marker key={i} position={{
        lat: Number(places[i].latitude),
        lng: Number(places[i].longitude)
      }}/>
    }
    return markers;
  }

  findZoom(places) {
    let minlat = 180;
    let maxlat = -180;
    let minlong = 180;
    let maxlong = -180;
    for (let i = 0; i < places.length; i++) {
      if (places[i].latitude < minlat) {
        minlat = places[i].latitude;
      }
      if (places[i].latitude > maxlat) {
        maxlat = places[i].latitude;
      }
      if (places[i].longitude < minlong) {
        minlong = places[i].longitude;
      }
      if (places[i].longitude > maxlong) {
        maxlong = places[i].longitude;
      }
    }
    let lat = Number(minlat) + (Number(maxlat) - Number(minlat)) / 2;
    let long = Number(minlong) + (Number(maxlong) - Number(minlong)) / 2;
    let dzoom = Math.abs(Number(maxlat) - Number(minlat)) * Math.abs(Number(
        minlong) - Number(maxlong));
    if (dzoom < 3) {
      dzoom = 9;
    } else if (dzoom < 30) {
      dzoom = 7;
    } else if (dzoom < 300) {
      dzoom = 5;
    } else {
      dzoom = 2
    }
    return {lat, long, dzoom}
  }

    createKML(){
      this.kmlFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n" +
          "  <Document>\n" +
          "    <name>Paths</name>\n" +
          "    <Style id=\"kmlMap\">\n" +
          "      <LineStyle>\n" +
          "        <color>FFA500</color>\n" +
          "        <width>4</width>\n" +
          "      </LineStyle>\n" +
          "    </Style>\n" +
          "    <Placemark>\n" +
          "      <name>Absolute Extruded</name>\n" +
          "      <LineString>\n" +
          "        <extrude>1</extrude>\n" +
          "        <tessellate>1</tessellate>\n" +
          "        <altitudeMode>absolute</altitudeMode>\n" +
          "        <coordinates>\n";
        for(let i = 0; i < this.pointPath.length; i++){
            this.kmlFile = this.kmlFile.concat("\t  " + this.pointPath[i].lng + "," + this.pointPath[i].lat + "\n");
        }
        this.kmlFile = this.kmlFile.concat("\t</coordinates>\n" +
                "      </LineString>\n" +
                "    </Placemark>\n" +
                "  </Document>\n" +
                "</kml>");
        this.saveKML(this.kmlFile);
    }

    saveKML(arg){
        let dataStr = "data:text/xml;charset=utf-8," + encodeURIComponent(
            arg);
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "map.xml");
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }


    saveKMLButton(){
        return(
            <button className="btn" style={{background: '#C8C372'}}
                    onClick={() => {this.createKML()}} type="submit">Save Map
            </button>
        )
    }

  render() {
    const places = this.props.trip.places;
    if (places.length === 0) {
      return null;
    }
    let zoom = this.findZoom(places);
    if (isNaN(zoom.lat) || isNaN(zoom.long)) {
      return null;
    }
    this.makePath(places);
    return (
        <div>
        <GoogleMap
            defaultCenter={{lat: 0, lng: 0}}
            defaultZoom={1}
        >
          <Polyline path={this.pointPath}
                    options={{strokeColor: '#FFA500'}}
          />
        </GoogleMap>
            {this.saveKMLButton()}
        </div>
    );
  }
}

// This uses a complicated feature of React called Higher Order Components, the recompose library
//  makes this more succinct. HOC's can be thought of as wrappers for functions.
// More information on HOC's can be found https://reactjs.org/docs/higher-order-components.html
// Information on recompose can be found https://github.com/acdlite/recompose
// IMPORTANT: lastly to use this file, I urge you to create an API key and paste it here(1)
//  Visit https://developers.google.com/maps/documentation/javascript/get-api-key and press Get A Key.
// Notice this (2) is the name of the above component.
const TripMap = compose(
    withProps({
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?' +
      'key=AIzaSyDqtbd69P2PJwKzhXVpmesbNgnEWIjaCsk' +
      '&v=3.exp' +
      '&libraries=geometry,drawing,places',
      loadingElement: <div/>,
      containerElement: <div/>,
      mapElement: <div style={{height: `50%`}}/>
    }),
    withScriptjs,
    withGoogleMap,
)(InnerMap);  // (2)

export default TripMap;