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
          <img className={"img-fluid"} alt="Responsive image" height={"100px"} src="https://raw.githubusercontent.com/csu314sp18/tripco/setup/sprint3/CompSci-NS-CSU-1-Hrev.png?token=Abgsf3eBaZyE1_KYpWDtuhuwefmoXOGVks5aoHl8wA%3D%3D" />
        </div>
    )
  }
}

export default Footer;