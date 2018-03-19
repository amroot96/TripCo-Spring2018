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
            <div id="footer" className="jumbotron">
                <h4>© TripCo t{this.props.number} {this.props.name} 2018</h4>
                <img className={"img-fluid"} alt="Responsive image" height={"100px"} src="http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png" />
            </div>
        )
    }
}

export default Footer;