import React, {Component} from 'react';
/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files. -- DONE
 * Finds destinations in a database???
 * Displays the current number of destinations -- DONE
 */
class Destinations extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            count: 0,
            file: "",
            database: {
               query: "",
               locations: [],
               filters: [],
            },
        };
        this.filterRegion = false;
        this.filterCountry = false;
        this.filterContinent = false;
        this.state = this.initialState;
        this.loadTFFI = this.loadTFFI.bind(this);
        this.database = this.database.bind(this);
        this.createTable = this.createTable.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    loadTFFI(event) {
        let json;
        let f = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            try {
                json = JSON.parse(e.target.result);
                this.setState({count : json.places.length});
                this.setState({file : json});
                this.props.updateTrip(json,1);
            } catch (ex) {
                alert(ex);
            }
        }.bind(this);
        reader.readAsText(f);
        // this.props.updateTrip(??);
    }

    queryResponse(){
        this.state.database.query = document.getElementById("search").value;
        let requestBody = this.state.database;
        const serverURL = 'http://' + location.host + '/query';
        console.log(serverURL);
        return fetch(serverURL, {
            method: "POST",
            body: JSON.stringify(requestBody)
        });

    }

    async database() {
        this.state = this.initialState;
        try {
            let serverResponse = await this.queryResponse();
            let query = await serverResponse.json();
            console.log(query.locations);
           // this.props.database.locations = new Array(query.locations.length);
            this.setState({
                database: {
                    query: query.query,
                    locations: query.locations,
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

  handleClick(param) {
    if(this.props.trip.places.length < 2) {
      this.props.trip.places.push(this.state.database.locations[param]);
      this.props.plan();
      return;
    }
    if (this.props.trip.places[this.props.trip.places.length - 1].name
        === (this.props.trip.places[0].name)) {
      this.props.trip.places.pop();
    }
    this.props.trip.places.push(this.state.database.locations[param]);
    this.props.plan();
  }

    handleFilterCheck(arg1){
        switch(arg1){
            case "region":
                this.filterRegion = this.filterRegion === true ? false : true;
                break;
            case "country":
                this.filterCountry = this.filterCountry === true ? false : true;
                break;
            case "continent":
                this.filterContinent = this.filterContinent === true ? false : true;
                break;
            default:
        }
    }

    createTable(){
        let loc = this.state.database.locations;
        let row = [];
        for(let i = 0; i < this.state.database.locations.length; i++) {
            row[i] =
                <tr key={i}>
                    <td key={loc[i].id}>{loc[i].id}</td>
                    <td key={loc[i].name}>{loc[i].name}</td>
                    <td key={loc[i].latitude}>{loc[i].latitude}</td>
                    <td key={loc[i].longitude}>{loc[i].longitude}</td>
                    <td key={i}><button className="button" onClick={ () => {this.handleClick(i)}}>Add</button></td>
                </tr>;
        }
        return {row};
    }

    filterType() {
        return(
            <select>
                <option key="placeholder" placeholder="Select Type">Type: </option>
                <option key="none">Any</option>
                <option key="small">Small Airport</option>
                <option key="medium">Medium Airport</option>
                <option key="large">Large Airport</option>
                <option key="heliport">Heliport</option>
                <option key="seaPlaneBase">SeaPlane Base</option>
                <option key="balloonport">Balloon Port</option>
                <option key="closed">Closed</option>
            </select>
        )
    }

  filterSearch() {
        return(
            <div className="dropdown">
                <div className="input-group-dropdown">
                    {this.filterType()}
                </div>
            </div>
        )
  }

    filterChecks(arg1){
        return(
            <label>
                <input type="checkbox" name={arg1} defaultChecked={false} onChange={() => this.handleFilterCheck(arg1)}/> {arg1}
            </label>
        )
    }

  displayQuery(){
        if(this.state.database.locations.length != 0) {
            let table = this.createTable();
            return (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div id="queries" className="card">
                        <div className="card-header text-white" style={{background:'#1E4D2B'}}>Search found the following destinations:</div>
                        <div className="card-body">
                            <table className="table table-responsive table-bordered">
                                <thead>
                                <tr className="table-outline-dark">
                                    <th key="id" id="id">ID</th>
                                    <th key="name" id="name">Name</th>
                                    <th key="lat" id="lat">Latitude</th>
                                    <th key="long" id="long">Longitude</th>
                                </tr>
                                </thead>
                                <tbody>
                                {table.row}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
  }
    destinationsField(){
        return(
            <div id="destinations" className="card">
                <div className="card-header text-white" style={{background:'#1E4D2B'}}>Destinations</div>
                <div className="card-body">
                    <p>Load destinations from a file.</p>
                    <div className="form-group" role="group">
                        <input type="file" className="form-control-file" onChange={this.loadTFFI} id="tffifile" />
                    </div>
                    <h5>There are {this.state.count} destinations in this file. </h5>
                </div>
            </div>
        )
    }

    destinationFinderField(){
        return(
            <div id="destinations" className="card">
                <div className="card-header text-white" style={{background:'#1E4D2B'}}>Destination Finder</div>
                <div className="card-body">
                    <p> Search for place or airport code. </p>
                    <div className="input-group" role="group">
                        <input type="txt" className="form-control" id="search" placeholder="Search..."/>
                        {this.filterSearch()}
                        <span className="input-group-btn">
                            <button className="btn btn" style={{background:'#CFB53B'}} type="button" onClick={this.database}>Search</button>
                        </span>
                    </div>
                    <p>{this.filterChecks("region")} {this.filterChecks("country")} {this.filterChecks("continent")}</p>
                    <p><small>*if no destinations displayed below, no matches found. Please perform a new search.</small></p>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        {this.destinationsField()}
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        {this.destinationFinderField()}
                    </div>
                    {this.displayQuery()}
                </div>
            </div>
        )
    }
}
export default Destinations;
