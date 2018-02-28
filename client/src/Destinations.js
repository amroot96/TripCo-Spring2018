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
      };
    this.loadTFFI = this.loadTFFI.bind(this);
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
  render() {
    // need to clean up the button
    // need to count the number in the trip -- DONE
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div id="destinations" className="card">
                        <div className="card-header bg-success text-white">
                            Destinations
                        </div>
                        <div className="card-body">
                            <p>Load destinations from a file.</p>
                            <div className="form-group" role="group">
                            <input type="file" className="form-control-file" onChange={this.loadTFFI} id="tffifile" />
                            </div>
                            <h5>There are {this.state.count} destinations. </h5>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div id="destinations" className="card">
                        <div className="card-header bg-success text-white">
                            Choose From Destinations
                        </div>
                        <div className="card-body">
                            <p>Add or remove from destination list.</p>
                            <button className="btn btn-outline-dark " type="button">Add Destination</button>
                            <div></div>
                            <button className="btn btn-outline-dark " type="button">Remove Destination</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Destinations;