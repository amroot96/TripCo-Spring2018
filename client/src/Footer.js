import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
    constructor(props) {
        super(props);
      this.state = {
        show: false,
        resumes : null
      };
      this.displayStaff = this.displayStaff.bind(this);
    }
    displayStaff(event) {
      if(event) {
        console.log("displaying");
        this.setState({resumes:
              <div className="card-body">
            <div className="card">
              <h3>Angela</h3>
            </div>
            <div className="card">
              <h3>Courtney</h3>
            </div>
            <div className="card">
              <h3>Jordan</h3>
            </div>
            <div className="card">
              <h3>Scott</h3>
            </div>
          </div>
        });
      }

    }
    render() {
        return (
            <div id="footer">
              <div id="footimage" className="jumbotron text-white" style={{background:'#1E4D2B'}}>
                <h4>© TripCo t{this.props.number} {this.props.name} 2018
                  <img className={"img-fluid center"} alt="Responsive image" src="http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png" />
                  <button className="btn btn" style={{background:'#CFB53B'}} type="button" onClick={this.displayStaff}>Staff Info</button>
                </h4>
              </div>
              {this.state.resumes}
            </div>
        )
    }
}

export default Footer;