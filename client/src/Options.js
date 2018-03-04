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
    this.none = "btn btn-outline-dark active";
    this.short = "btn btn-outline-dark";
    this.shorter = "btn btn-outline-dark";
    this.shortest = "btn btn-outline-dark";
  }
  componentWillReceiveProps(nextProps) {
    console.log("Component will recieve props");
    console.log(nextProps);
    console.log(nextProps.options.distance);
    if(nextProps.options.distance !== this.props.options.distance) {
      if (nextProps.options.distance === "miles") {
        this.miles = "btn btn-outline-dark active";
        this.kilometers = "btn btn-outline-dark";
        this.nautical = "btn btn-outline-dark";
      }
      else if (nextProps.options.distance === "kilometers") {
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
    if(nextProps.options.optimization !== this.props.options.optimization) {
      if (nextProps.options.optimization == "none") {
        this.none = "btn btn-outline-dark active";
        this.short = "btn btn-outline-dark";
        this.shorter = "btn btn-outline-dark";
        this.shortest = "btn btn-outline-dark";
      }
      else if (nextProps.options.optimization == "short"){
        this.short = "btn btn-outline-dark active";
        this.none = "btn btn-outline-dark";
        this.shorter = "btn btn-outline-dark";
        this.shortest = "btn btn-outline-dark";
      }
      else if (nextProps.options.optimization == "shorter"){
        this.shorter = "btn btn-outline-dark active";
        this.none = "btn btn-outline-dark";
        this.short = "btn btn-outline-dark";
        this.shortest = "btn btn-outline-dark";
      }
      else {
        this.shortest = "btn btn-outline-dark active";
        this.none = "btn btn-outline-dark";
        this.shorter = "btn btn-outline-dark";
        this.short = "btn btn-outline-dark";
      }
    }
  }
  changeOption(arg) {
    console.log("updating distance options to...");
    console.log(arg.target.version);
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
      this.none = "btn btn-outline-dark active";
      this.short = "btn btn-outline-dark";
      this.shorter = "btn btn-outline-dark";
      this.shortest = "btn btn-outline-dark";
    }
    else if (arg.target.id == "short"){
      this.short = "btn btn-outline-dark active";
      this.none = "btn btn-outline-dark";
      this.shorter = "btn btn-outline-dark";
      this.shortest = "btn btn-outline-dark";
    }
    else if (arg.target.id == "shorter"){
      this.shorter = "btn btn-outline-dark active";
      this.none = "btn btn-outline-dark";
      this.short = "btn btn-outline-dark";
      this.shortest = "btn btn-outline-dark";
    }
    else {
      this.shortest = "btn btn-outline-dark active";
      this.none = "btn btn-outline-dark";
      this.shorter = "btn btn-outline-dark";
      this.short = "btn btn-outline-dark";
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
                                <label className={this.none}>
                                    <input type="radio" id="none" name="optimization" autoComplete="off" onChange={this.changeOption2}/> No
                                </label>
                                <label className={this.short}>
                                    <input type="radio" id="short" name="optimization" autoComplete="off" onChange={this.changeOption2}/> Short
                                </label>
                              <label className={this.shorter}>
                                <input type="radio" id="shorter" name="optimization" autoComplete="off" onChange={this.changeOption2}/> Shorter
                              </label>
                              <label className={this.shortest}>
                                <input type="radio" id="shortest" name="optimization" autoComplete="off" onChange={this.changeOption2}/> Shortest
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