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
      this.Scott = this.Scott.bind(this);
    }
    Scott() {
      return (
          <div className="card-body">
            <h5 className="card-title">Scott Magisano</h5>
            511 Lake Street, Apt 408D<br />
            Fort Collins, CO  80521<br />
            720-313-0202<br />
            Smag@rams.colostate.edu<br />
            <h5 className="card-title">Qualitifcations</h5>
            Programming Languages:  Java, Python, C, C++<br />
            Operating Systems: UNIX, Windows<br />
            Data Analysis:  MatLab, R, Apache platforms<br />
            <h5 className="card-title">Experience</h5>
            <table className="table table-sm">
              <tbody>
              <tr>
                <th> SWIFT instructor, Computer Science Department</th>
                <td> Two-week camp for women ages 15 – 17 where I introduced programming in Python</td>
                <td> Created lesson plan and delivered information on a website using HTML</td>
                <td> Introduced programming languages and career opportunities in Computer Science</td>
              </tr>
              <tr>
                <th> Big Data, Computer Science Department</th>
                <td> Sorting algorithms on data that is too large to load into memory including Geospatial data</td>
                <td> Learning techniques in workflow and system</td>
                <td> Acquired skills in Apache platforms, memory partition, graph theory and edges</td>
              </tr>
              <tr>
                <th>Seismology, Mathematics Department</th>
                <td> Examining seismology data from glaciers</td>
                <td> Signal processing of data using self-made MATLAB tools</td>
              </tr>
              </tbody>
            </table>
          </div>
      )
    }
  Courtney() {
    return (
        <div className="card-body">
          <h5 className="card-title">Courtney Torres</h5>
        </div>
    )
  }
  Jordan() {
    return (
        <div className="card-body">
            <h5 className="card-title">Jordan Peterson</h5>
                <a href="http://www.cs.colostate.edu/~jordantp/">Resume</a>
        </div>
    )
  }
  Angela() {
    return (
        <div className="card-body">
          <h5 className="card-title">Angela Root</h5>
            <a href="http://www.cs.colostate.edu/~amroot/">Resume</a>
        </div>
    )
  }
    displayStaff(event) {
      if(event) {
        this.setState({resumes:
          <div className="card-body">
            <div className="card">
              {this.Scott()}
            </div>
            <div className="card">
              {this.Courtney()}
            </div>
            <div className="card">
              {this.Jordan()}
            </div>
            <div className="card">
              {this.Angela()}
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
                  <button className="btn btn" style={{background:'#C8C372'}} type="button" onClick={this.displayStaff}>Staff Info</button>
                </h4>
              </div>
              {this.state.resumes}
            </div>
        )
    }
}

export default Footer;