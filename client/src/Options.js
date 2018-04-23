import React, {Component} from 'react';
import cookie from 'react-cookies';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Name : "",
        Radius : "",
    };
    this.kilometerButton = this.kilometerButton.bind(this);
    this.milesButton = this.milesButton.bind(this);
    this.nauticalButton = this.nauticalButton.bind(this);
    this.noneButton = this.noneButton.bind(this);
    this.shortButton = this.shortButton.bind(this);
    this.shorterButton = this.shorterButton.bind(this);
    this.shortestButton = this.shortestButton.bind(this);
    this.labelTag = this.labelTag.bind(this);
    this.enter = this.enter.bind(this);
    this.on = "btn btn-outline-dark active";
    this.off = "btn btn-outline-dark";
    this.container = "col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6";
    this.id = "\"options\" className=\"card\">";
    this.miles = this.on;
    this.userUnit = this.off;
    this.kilometers = this.off;
    this.nautical = this.off;
    this.toggleDistBool(cookie.load('distance'));
    this.none = this.on;
    this.short = this.off;
    this.shorter = this.off;
    this.shortest = this.off;
    this.toggleOptBool(cookie.load('optimization'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.distance !== this.props.options.distance) {
      this.distanceButtonSelector(nextProps.options.distance,2);
    }
    if (nextProps.options.optimization !== this.props.options.optimization) {
      this.optimizeButtonSelector(nextProps.options.optimization,2);
    }
  }

  distanceButtonSelector(arg,type) {
    switch (arg) {
      case "miles":
        this.milesButton(type);
        break;
      case "kilometers":
        this.kilometerButton(type);
        break;
      case "nautical miles":
        this.nauticalButton(type);
        break;
      default:
        this.milesButton(type);
    }
  }

  optimizeButtonSelector(arg,type) {
    switch (arg) {
      case arg == 0:
        this.noneButton(type);
      case arg < 0.5:
        this.shortButton(type);
        break;
      case arg < 1.0:
        this.shorterButton(type);
        break;
      case arg < 1.5:
          this.shortestButton(type);
          break;
      default:
        this.noneButton(type);
    }
  }

  toggleOptBool(arg) {
    this.none = this.off;
    this.short = this.off;
    this.shorter = this.off;
    this.shortest = this.off;

    switch (arg) {
      case "0":
        this.none = this.on;
        break;
      case "0.5":
        this.short = this.on;
        break;
      case "1.0":
        this.shorter = this.on;
        break;
      case "1.5":
          this.shortest = this.on;
          break;
      default:
    }
  }

  toggleDistBool(arg) {
    this.miles = this.off;
    this.kilometers = this.off;
    this.nautical = this.off;
    this.userUnit = this.off;

    switch (arg) {
      case "miles":
        this.miles = this.on;
        break;
      case "kilometers":
        this.kilometers = this.on;
        break;
      case "nautical":
        this.nautical = this.on;
        break;
      default:
        this.userUnit = this.on;
    }
  }

  shortestButton(type) {
      if(type !== 2) {
          this.props.updateOptions("1.5", "optimization");
      }
      this.toggleOptBool("1.5");
  }
  shorterButton(type) {
    if(type !== 2) {
      this.props.updateOptions("1.0", "optimization");
    }
    this.toggleOptBool("1.0");
  }

  shortButton(type) {
    if(type !== 2) {
      this.props.updateOptions("0.5", "optimization");
    }
    this.toggleOptBool("0.5");
  }

  noneButton(type) {
    if(type !== 2) {
      this.props.updateOptions("0", "optimization");
    }
    this.toggleOptBool("0");
  }

  milesButton(type) {
    if(type !== 2) {
      this.props.updateOptions("miles", "distance");
    }
    this.toggleDistBool("miles");
  }

  nauticalButton(type) {
    if(type !== 2) {
      this.props.updateOptions("nautical", "distance");
    }
    this.toggleDistBool("nautical");
  }

  kilometerButton(type) {
    if(type !== 2) {
      this.props.updateOptions("kilometers", "distance");
    }
    this.toggleDistBool("kilometers");
  }

  labelTag(argClassName, argID, argName, argOnChange, argView) {
    return (
        <label className={argClassName}>
          <input type="radio" id={argID} name={argName} autoComplete="off"
                 onChange={argOnChange}/> {argView}
        </label>
    )
  }

  enter(event) {
    if (event.target.name === "Name") {
      this.setState({Name:event.target.value});
      if (event.which === 13 || event.keyCode === 13 && this.state.Name !== "" && this.state.Radius !== "") {
        this.props.updateOptions(event.target.value + " " + this.state.Radius, "distance");
      }
    } else {
      this.setState({Radius:event.target.value});
      if (event.which === 13 || event.keyCode === 13 && this.state.Name !== "" && this.state.Radius !== "") {
        this.props.updateOptions(this.state.Name + " " + event.target.value, "distance");
      }
    }
  }

  optionField() {
    return (
        <div className="card-body">
          <p>Highlight the options you wish to use.</p>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {this.labelTag(this.miles, "miles", "distance", this.milesButton,
                "Miles")}
            {this.labelTag(this.kilometers, "kilometers", "distance",
                this.kilometerButton, "Kilometers")}
            {this.labelTag(this.nautical, "nautical miles", "distance",
                this.nauticalButton, "Nautical Miles")}
                </div>
            <div>Or enter your own unit name and radius of the Earth:</div>
            <input name="Name" type="text" id="UD" placeholder="Name" onKeyDown={this.enter}/>
            <input name="Radius" type="text" id="UD" placeholder="Radius" onKeyDown={this.enter}/>
        </div>
    )
  }

  optimizeField() {
    return (
        <div className="card-body">
          <p>Would you like to optimize your trip? </p>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {this.labelTag(this.none, "none", "optimization", this.noneButton,
                "None")}
            {this.labelTag(this.short, "short", "optimization",
                this.shortButton, "Short")}
            {this.labelTag(this.shorter, "shorter", "optimization",
                this.shorterButton, "Shorter")}
            {this.labelTag(this.shortest, "shortest", "optimization",
                  this.shortestButton, "Shortest")}
          </div>
        </div>
    )
  }

  render() {
    return (
        <div className="card-group">
          <div className="card">
            <div className="card-header text-white"
                 style={{background: '#1E4D2B'}}>Options
            </div>
            {this.optionField()}
          </div>

          <div className="card">
            <div className="card-header text-white"
                 style={{background: '#1E4D2B'}}>Optimizations
            </div>
            {this.optimizeField()}
          </div>
        </div>
    )
  }
}

export default Options;