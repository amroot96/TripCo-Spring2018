import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="footer" className="jumbotron text-white" style={{background:'#1E4D2B'}}>
                <h4>© TripCo t{this.props.number} {this.props.name} 2018
                <img className={"img-fluid float-right"} alt="Responsive image" src="http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png" />
                </h4>
            </div>
        )
    }
}

export default Footer;