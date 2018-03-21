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
        this.state = {
            count: 0,
            file: "",
            database: {
               query: "",
               locations: [],
            },
        };
        this.loadTFFI = this.loadTFFI.bind(this);
      //  this.searchQuery = this.searchQuery.bind(this);
        this.database = this.database.bind(this);
        this.createTable = this.createTable.bind(this);
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
        const serverURL = 'http://' + location.host + '/database';
        console.log(serverURL);
        return fetch(serverURL, {
            method: "POST",
            body: JSON.stringify(requestBody)
        });

    }

    async database() {
        console.log("Database");
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
            console.log(this.state.database.locations);
        } catch (err) {
            console.error(err);
        }
    }

    createTable(){
        console.log(this.state.database.locations.size);
        let loc = this.state.database.locations;
        let row = [];
        for(let i = 0; i < this.state.database.locations.length; i++) {
            row[i] =
            <tr>
                <td key={loc[i].id}>{loc[i].id}</td>
                <td key={loc[i].name}>{loc[i].name}</td>
                <td key={loc[i].latitude}>{loc[i].latitude}</td>
                <td key={loc[i].longitude}>{loc[i].longitude}</td>
            </tr>;
        }
        return {row};
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
                    <h5>There are {this.state.count} destinations. </h5>
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
                        <span className="input-group-btn">
                            <button className="btn btn" style={{background:'#CFB53B'}} type="button" onClick={this.database}>Search</button>
                        </span>
                    </div>
                    <p></p>
                    <p><small>*if no destinations displayed below, no matches found. Please perform a new search.</small></p>
                </div>
            </div>
        )
    }

    displayQuery(){
        let table = this.createTable();
        console.log("display query called");
        return(
                <div className="card-body">
                    <table className="table table-responsive table-bordered">
                        <thead>
                            <tr className="table-outline-dark">
                                <th id="id">ID</th>
                                <th id="name">Name</th>
                                <th id="lat">Latitude</th>
                                <th id="long">Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                        {table.row}
                        </tbody>
                    </table>
                </div>
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        {this.destinationsField()}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        {this.destinationFinderField()}
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div id="queries" className="card">
                            <div className="card-header text-white" style={{background:'#1E4D2B'}}>Search found the following destinations:</div>
                            {this.displayQuery()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Destinations;
