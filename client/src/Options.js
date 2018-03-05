import React, {Component} from 'react';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
  constructor(props) {
    super(props);
    this.kilometerButton = this.kilometerButton.bind(this);
    this.milesButton = this.milesButton.bind(this);
    this.nauticalButton = this.nauticalButton.bind(this);
    this.noneButton = this.noneButton.bind(this);
    this.shortButton = this.shortButton.bind(this);
    this.shorterButton = this.shorterButton.bind(this);
    this.shortestButton = this.shortestButton.bind(this);
    this.miles = "btn btn-outline-dark active";
    this.kilometers = "btn btn-outline-dark";
    this.nautical = "btn btn-outline-dark";
    this.none = "btn btn-outline-dark active";
    this.short = "btn btn-outline-dark";
    this.shorter = "btn btn-outline-dark";
    this.shortest = "btn btn-outline-dark";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.distance !== this.props.options.distance) {
      if (nextProps.options.distance === "miles") {
        this.milesButton();
      }
      else if (nextProps.options.distance === "kilometers") {
        this.kilometerButton();
      }
      else {
        this.nauticalButton()
      }
    }
    if (nextProps.options.optimization !== this.props.options.optimization) {
      if (nextProps.options.optimization === "none") {
        this.noneButton();
      }
      else if (nextProps.options.optimization === "short") {
        this.shortButton();
      }
      else if (nextProps.options.optimization === "shorter") {
        this.shorterButton();
      }
      else {
        this.shortestButton();
      }
    }
  }

  shortestButton() {
    this.props.updateOptions("shortest", "optimization");
    this.shortest = "btn btn-outline-dark active";
    this.none = "btn btn-outline-dark";
    this.shorter = "btn btn-outline-dark";
    this.short = "btn btn-outline-dark";
  }

  shorterButton() {
    this.props.updateOptions("shorter", "optimization");
    this.shorter = "btn btn-outline-dark active";
    this.none = "btn btn-outline-dark";
    this.short = "btn btn-outline-dark";
    this.shortest = "btn btn-outline-dark";
  }

  shortButton() {
    this.props.updateOptions("short", "optimization");
    this.short = "btn btn-outline-dark active";
    this.none = "btn btn-outline-dark";
    this.shorter = "btn btn-outline-dark";
    this.shortest = "btn btn-outline-dark";
  }

  noneButton() {
    this.props.updateOptions("none", "optimization");
    this.none = "btn btn-outline-dark active";
    this.short = "btn btn-outline-dark";
    this.shorter = "btn btn-outline-dark";
    this.shortest = "btn btn-outline-dark";
  }

  milesButton() {
    this.props.updateOptions("miles", "distance");
    this.miles = "btn btn-outline-dark active";
    this.kilometers = "btn btn-outline-dark";
    this.nautical = "btn btn-outline-dark";
  }

  nauticalButton() {
    this.props.updateOptions("nautical", "distance");
    this.nautical = "btn btn-outline-dark active";
    this.miles = "btn btn-outline-dark";
    this.kilometers = "btn btn-outline-dark";
  }

  kilometerButton() {
    this.props.updateOptions("kilometers", "distance");
    this.kilometers = "btn btn-outline-dark active";
    this.miles = "btn btn-outline-dark";
    this.nautical = "btn btn-outline-dark";
  }

  render() {
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
                  <div className="btn-group btn-group-toggle"
                       data-toggle="buttons">
                    <label className={this.miles}>
                      <input type="radio" id="miles" name="distance"
                             autoComplete="off"
                             onChange={this.milesButton}/> Miles
                    </label>
                    <label className={this.kilometers}>
                      <input type="radio" id="kilometers" name="distance"
                             autoComplete="off"
                             onChange={this.kilometerButton}/> Kilometers
                    </label>
                    <label className={this.nautical}>
                      <input type="radio" id="nautical miles" name="distance"
                             autoComplete="off"
                             onChange={this.nauticalButton}/> Nautical Miles
                    </label>
                  </div>
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
                  <div className="btn-group btn-group-toggle"
                       data-toggle="buttons">
                    <label className={this.none}>
                      <input type="radio" id="none" name="optimization"
                             autoComplete="off"
                             onChange={this.noneButton}/> No
                    </label>
                    <label className={this.short}>
                      <input type="radio" id="short" name="optimization"
                             autoComplete="off"
                             onChange={this.shortButton}/> Short
                    </label>
                    <label className={this.shorter}>
                      <input type="radio" id="shorter" name="optimization"
                             autoComplete="off"
                             onChange={this.shorterButton}/> Shorter
                    </label>
                    <label className={this.shortest}>
                      <input type="radio" id="shortest" name="optimization"
                             autoComplete="off"
                             onChange={this.shortestButton}/> Shortest
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