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
    this.on = "btn btn-outline-dark active";
    this.off = "btn btn-outline-dark";
    this.miles = this.on;
    this.kilometers = this.off;
    this.nautical = this.off;
    this.none = this.on;
    this.short = this.off;
    this.shorter = this.off;
    this.shortest = this.off;
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
    this.props.updateOptions("0.75", "optimization");
    this.shortest = this.on;
    this.none = this.off;
    this.shorter = this.off;
    this.short = this.off;
  }

  shorterButton() {
    this.props.updateOptions("0.5", "optimization");
    this.shorter = this.on;
    this.none = this.off;
    this.short = this.off;
    this.shortest = this.off;
  }

  shortButton() {
    this.props.updateOptions("0.25", "optimization");
    this.short = this.on;
    this.none = this.off;
    this.shorter = this.off;
    this.shortest = this.off;
  }

  noneButton() {
    this.props.updateOptions("0", "optimization");
    this.none = this.on;
    this.short = this.off;
    this.shorter = this.off;
    this.shortest = this.off;
  }

  milesButton() {
    this.props.updateOptions("miles", "distance");
    this.miles = this.on;
    this.kilometers = this.off;
    this.nautical = this.off;
  }

  nauticalButton() {
    this.props.updateOptions("nautical", "distance");
    this.nautical = this.on;
    this.miles = this.off;
    this.kilometers = this.off;
  }

  kilometerButton() {
    this.props.updateOptions("kilometers", "distance");
    this.kilometers = this.on;
    this.miles = this.off;
    this.nautical = this.off;
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