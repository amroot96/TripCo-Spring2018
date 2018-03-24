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
    this.userDefinedButton = this.userDefinedButton.bind(this);
    this.noneButton = this.noneButton.bind(this);
    this.shortButton = this.shortButton.bind(this);
    this.shorterButton = this.shorterButton.bind(this);
    this.shortestButton = this.shortestButton.bind(this);
    this.labelTag = this.labelTag.bind(this);
    this.on = "btn btn-outline-dark active";
    this.off = "btn btn-outline-dark";
    this.container = "col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6";
    this.id = "\"options\" className=\"card\">";
    this.miles = this.on;
    this.userUnit = this.off;
    this.kilometers = this.off;
    this.nautical = this.off;
    this.none = this.on;
    this.short = this.off;
    this.shorter = this.off;
    this.shortest = this.off;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.distance !== this.props.options.distance) {
     this.distanceButtonSelector(nextProps.options.distance);
    }
    if (nextProps.options.optimization !== this.props.options.optimization) {
        if(nextProps.version === undefined || nextProps.version === 1){
            this.noneButton();
        }
        else if(nextProps.version === 2){
            this.optimizeButtonSelector(nextProps.options.optimization);
        }
    }
  }

  distanceButtonSelector(arg){
      let select = arg;
      switch(arg){
          case "miles": this.milesButton();
                        break;
          case "kilometers": this.kilometerButton();
                        break;
          case "nautical miles": this.nauticalButton();
                        break;
          default: this.userDefinedButton();
      }
  }

  optimizeButtonSelector(arg){
      switch(arg){
          case arg < 0.33: this.shortButton();
                        break;
          case arg < 0.66: this.shorterButton();
                        break;
          case arg > 0.66: this.shortestButton();
                        break;
          default: this.noneButton();
      }
  }

  toggleOptBool(arg){
      this.none = this.off;
      this.short = this.off;
      this.shorter = this.off;
      this.shortest = this.off;

      switch(arg){
          case "0": this.none = this.on;
                    break;
          case "0.25": this.short = this.on;
                    break;
          case "0.5": this.shorter = this.on;
                    break;
          case "0.75": this.shortest = this.on;
                    break;
          default:
      }
  }

  toggleDistBool(arg){
      this.miles = this.off;
      this.kilometers = this.off;
      this.nautical = this.off;
      this.userUnit = this.off;

      switch(arg){
          case "miles": this.miles = this.on;
                    break;
          case "kilometers": this.kilometers = this.on;
                    break;
          case "nautical": this.nautical = this.on;
                    break;
          default: this.userUnit = this.on;
      }
  }

  shortestButton() {
    this.props.updateOptions("0.75", "optimization");
    this.toggleOptBool("0.75");
  }

  shorterButton() {
    this.props.updateOptions("0.5", "optimization");
      this.toggleOptBool("0.5");
  }

  shortButton() {
    this.props.updateOptions("0.25", "optimization");
      this.toggleOptBool("0.25");
  }

  noneButton() {
    this.props.updateOptions("0", "optimization");
      this.toggleOptBool("0");
  }

  milesButton() {
    this.props.updateOptions("miles", "distance");
    this.toggleDistBool("miles");
  }

  nauticalButton() {
    this.props.updateOptions("nautical", "distance");
      this.toggleDistBool("nautical");
  }

  kilometerButton() {
    this.props.updateOptions("kilometers", "distance");
      this.toggleDistBool("kilometers");
  }

  userDefinedButton(){
      this.props.updateOptions("user defined", "distance");
      this.toggleDistBool("user defined");
  }

  labelTag(argClassName,argID,argName,argOnChange,argView){
      return(
        <label className={argClassName}>
            <input type="radio" id={argID} name={argName} autoComplete="off" onChange={argOnChange}/> {argView}
        </label>
      )
  }

  optionField(){
    return(
            <div className="card-body">
                <p>Highlight the options you wish to use.</p>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    {this.labelTag(this.miles,"miles","distance",this.milesButton,"Miles")}
                    {this.labelTag(this.kilometers,"kilometers","distance",this.kilometerButton,"Kilometers")}
                    {this.labelTag(this.nautical,"nautical miles","distance",this.nauticalButton,"Nautical Miles")}
                    {this.labelTag(this.userUnit,"user defined","distance",this.userDefinedButton,"User Defined")}
                </div>
            </div>
    )
  }

  optimizeField(){
    return(
            <div className="card-body">
                <p>Would you like to optimize your trip? </p>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    {this.labelTag(this.none,"none","optimization",this.noneButton,"None")}
                    {this.labelTag(this.short,"short","optimization",this.shortButton,"Short")}
                    {this.labelTag(this.shorter,"shorter","optimization",this.shorterButton,"Shorter")}
                </div>
            </div>
    )
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className={this.container}>
                <div id="options" className="card">
                    <div className="card-header text-white" style={{background:'#1E4D2B'}}>Options</div>
                    {this.optionField()}
                </div>
            </div>
            <div className={this.container}>
                <div id="optimize" className="card">
                    <div className="card-header text-white" style={{background:'#1E4D2B'}}>Optimizations</div>
                    {this.optimizeField()}
                </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Options;