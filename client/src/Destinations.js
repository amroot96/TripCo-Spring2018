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
               places: [],
               filters: [
                         { attribute : "type",
                           values : []
                         }
                        ],
                limit: -1,
            },
            error: "",
        };
        this.filterRegion = false;
        this.filterCountry = false;
        this.filterContinent = false;
        this.filterRegionActive = true;
        this.filterCountryActive = true;
        this.filterContinentActive = true;
        this.typeOption = " ";
        this.state = this.initialState;
        this.loadTFFI = this.loadTFFI.bind(this);
        this.database = this.database.bind(this);
        this.createTable = this.createTable.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getFilters = this.getFilters.bind(this);
        this.filterChecks()
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
                this.setState({error: "false"});
            } catch (ex) {
                this.setState({error: "true"});
            }
        }.bind(this);

        this.displayAlert();
        reader.readAsText(f);
        // this.props.updateTrip(??);
    }


    getFilters(){
        var type = document.getElementById("type").value;
        if(type != "placeholder"){
            this.state.database.filters[0].values = [document.getElementById("type").value];
        }

    }
    displayAlert(){
        if(this.state.error == "false"){
            return(
                <div className="alert alert-success">
                    <strong>Loaded file successfully!</strong> .
                </div>
            )
        }
        if(this.state.error == "true"){
            return(
                <div className="alert alert-danger">
                    <strong>Error: </strong> Failed to load file.
                </div>
            )
        }


    }

    limitResponse(){
        this.state.database.limit = document.getElementById("limit").value;
        if(this.state.database.limit === "")
            this.state.database.limit = -1;
    }

    queryResponse(){
        this.state.database.query = document.getElementById("search").value;
        this.getFilters();
        this.limitResponse();
        let requestBody = this.state.database;
        const serverURL = this.props.serverHost + '/query';
        return fetch(serverURL, {
            header: {'Access-Control-Allow-Origin':'*'},
            method: "POST",
            body: JSON.stringify(requestBody)
        });

    }

    async database() {
        this.state = this.initialState;
        try {
            let serverResponse = await this.queryResponse();
            let query = await serverResponse.json();
            console.log(query.places);
           // this.props.database.locations = new Array(query.locations.length);
            this.setState({
                database: {
                    query: query.query,
                    places: query.places,
                    filters : query.filters,
                    limit: query.limit,
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

  handleClick(param) {
    if(this.props.trip.places.length < 2) {
      this.props.trip.places.push(this.state.database.places[param]);
      this.props.plan();
      return;
    }
    if (this.props.trip.places[this.props.trip.places.length - 1].name
        === (this.props.trip.places[0].name)) {
      this.props.trip.places.pop();
    }
    this.props.trip.places.push(this.state.database.places[param]);
    this.props.plan();
  }


    createTable(){
        let loc = this.state.database.places;
        let row = [];
        let count = 0;
        for(let i = 0; i < this.state.database.places.length; i++) {
            count++;
            row[i] =
                <tr key={i}>
                    <td key={i}><button className="button" onClick={ () => {this.handleClick(i)}}>Add</button></td>
                    <td key={loc[i].name}>{loc[i].name}</td>
                    <td key={loc[i].id}>{loc[i].id}</td>
                    <td key={loc[i].latitude}>{loc[i].latitude}</td>
                    <td key={loc[i].longitude}>{loc[i].longitude}</td>
                </tr>;
        }
        return {row};
    }
// <td key={count}>{count}</td>

    filterType() {
        return(
            <select id="type" className="form-control">
                <option value="placeholder" placeholder="Select Type">Type: </option>
                <option value="none">Any</option>
                <option value="small_airport">Small Airport</option>
                <option value="medium_airport">Medium Airport</option>
                <option value="large_airport">Large Airport</option>
                <option value="heliport">Heliport</option>
                <option value="seaplane_base">SeaPlane Base</option>
                <option value="balloonport">Balloon Port</option>
                <option value="closed">Closed</option>
            </select>
        )
    }

    filterBox(arg1, arg2, arg3){
        if(arg3 === true) {
            return (
                <input type="txt" className="form-control" id={arg2} placeholder={arg1}/>
            )
        }
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

    filterChecks(arg1,arg2){
        if(arg2 ===true) {
            return (
                <label>
                    <input type="checkbox" name={arg1} defaultChecked={false}
                           onChange={() => this.handleFilterCheck(arg1)}/> {arg1}
                </label>
            )
        }
    }

  displayQuery(){
        if(this.state.database.places.length != 0) {
            let table = this.createTable();
            return (
              <div id="queries" className="card">
                  <div className="card-header text-white" style={{background:'#1E4D2B'}}>Search Results:</div>
                  <div className="card-body">
                      <div  className="pre-scrollable">
                      <table className="table table-responsive table-bordered">
                        <thead>
                        <tr className="table-outline-dark">
                            <th key="add" id="add"></th>
                          <th key="name" id="name">Name</th>
                          <th key="id" id="id">ID</th>
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
                    {this.displayAlert()}
                </div>
            </div>
        )
    }

    destinationFinderField(){
        return(
            <div id="destinations" className="card">
                <div className="card-header text-white" style={{background:'#1E4D2B'}}>Destination Finder</div>
                <div className="card-body">
                  <input type="txt" className="form-control" id="search" placeholder="Search..."/>
                        <input type="txt" className="form-control" id="limit" placeholder="Limit to..."/>
                        {this.filterSearch()}
                        <span className="input-group-btn">
                            <button className="btn btn" style={{background:'#C8C372'}} type="button" onClick={this.database}>Search</button>
                        </span>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id = "Destinations">
              <div className="card-group">
                  <div className="card">
                      {this.destinationsField()}
                  </div>
                  <div className="card">
                      {this.destinationFinderField()}
                  </div>
              </div>
                  {this.displayQuery()}
            </div>
        )
    }
}
export default Destinations;
