import React, {Component} from 'react';


/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
    this.changeOption2 = this.changeOption2.bind(this);
    this.miles = "btn btn-outline-dark active";
    this.kilometers = "btn btn-outline-dark";
    this.nautical = "btn btn-outline-dark";
    this.button3 = "btn btn-outline-dark active";
    this.button4 = "btn btn-outline-dark";
  }

  changeOption(arg) {
    console.log("updating distance options to...");
    this.props.updateOptions(arg.target.id,"distance");
    if (arg.target.id == "miles") {
      this.miles = "btn btn-outline-dark active";
      this.kilometers = "btn btn-outline-dark";
      this.nautical = "btn btn-outline-dark";
    }
    else if (arg.target.id == "kilometers") {
      this.kilometers = "btn btn-outline-dark active";
      this.miles = "btn btn-outline-dark";
      this.nautical = "btn btn-outline-dark";
    }
    else {
        this.nautical = "btn btn-outline-dark active";
        this.miles = "btn btn-outline-dark";
        this.kilometers = "btn btn-outline-dark";
    }
  }

  changeOption2(arg) {
    console.log("updating distance options to...");
    this.props.updateOptions(arg.target.id,"optimization");
    if (arg.target.id == "none") {
      this.button3 = "btn btn-outline-dark active";
      this.button4 = "btn btn-outline-dark";
    }
    else {
      this.button4 = "btn btn-outline-dark active";
      this.button3 = "btn btn-outline-dark";
    }
  }

  render() {
    // @todo need to update the options when a button is pressed
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div id="options" className="card">
                        <div className="card-header bg-success text-white">
                            Options
                        </div>
                        <div className="card-body">
                            <p>Highlight the options you wish to use.</p>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={this.miles}>
                                    <input type="radio" id="miles" name="distance" autoComplete="off" onChange={this.changeOption}/> Miles
                                </label>
                                <label className={this.kilometers}>
                                    <input type="radio" id="kilometers" name="distance" autoComplete="off" onChange={this.changeOption}/> Kilometers
                                </label>
                                <label className={this.nautical}>
                                    <input type="radio" id="nautical miles" name="distance" autoComplete="off" onChange={this.changeOption}/> Nautical Miles
                                </label>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div id="options" className="card">
                        <div className="card-header bg-success text-white">
                            Optimization
                        </div>
                        <div className="card-body">
                            <p>Would you like to optimize your trip? </p>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={this.button3}>
                                    <input type="radio" id="none" name="optimization" autoComplete="off" onChange={this.changeOption2}/> No
                                </label>
                                <label className={this.button4}>
                                    <input type="radio" id="Nearest_Neighbor" name="optimization" autoComplete="off" onChange={this.changeOption2}/> Nearest Neighbor
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Options;