import React, {Component} from 'react';
import Helmet from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="tripco" className="card" style={{background:'#1E4D2B',height:'200px', width:'auto', marginBottom:'50px'} }>
                <img className={"img-fluid center"} alt="Responsive image"  style={{height:'200px', width:'800px'}} src={"http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png"}/>
            </div>
        )
    }

    title() {
        return( <h3>TripCo <small>t{this.props.number} {this.props.name}</small></h3> )
    }
}

export default Header;