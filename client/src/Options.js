import React, {Component} from 'react';


/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
    constructor(props) {
        super(props);
        this.changeOption = this.changeOption.bind(this);
        this.button1 = "btn btn-outline-dark active";
        this.button2 = "btn btn-outline-dark";
    }

    changeOption(arg) {
        console.log("updating distance options to...");
        this.props.updateOptions(arg.target.id);
        if(arg.target.id == "miles"){
            this.button1 = "btn btn-outline-dark active";
            this.button2 = "btn btn-outline-dark";
        }
        else{
            this.button2 = "btn btn-outline-dark active";
            this.button1 = "btn btn-outline-dark";
        }
    }


    render() {
        // @todo need to update the options when a button is pressed
        return(
            <div id="options" className="card">
                <div className="card-header bg-success text-white">
                    Options
                </div>
                <div className="card-body">
                    <p>Highlight the options you wish to use.</p>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className={this.button1}>
                            <input type="radio" id="miles" name="distance" autcomplete="off" onChange={this.changeOption}/> Miles
                        </label>
                        <label className={this.button2}>
                            <input type="radio" id="kilometers" name="distance" autcomplete="off" onChange={this.changeOption}/> Kilometers
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Options;