class Header extends React.Component{
  render(){
    return(
      <h1>Resume</h1>
    )
  }
}

class Body extends React.Component{
  render() {
    return (
      <div> 
        <p className="bod">
        <h1>Jordan Peterson</h1>
        <small>Address: 912 Cambridge Dr, Fort Collins, CO 80525</small>
        <div>
          <small>Email: jordantp@rams.colostate.edu</small>
        </div>
        <div>
          <small>Phone: (720)300-9866</small>
        </div>
        </p>
        <p className="bod">
          <b>Objective:</b> A Computer Scientist seeking employment in the field of Computer Security
        </p>
        <p className="bod">
          <h3>Education</h3>
          <u>Colorado State University</u>
          <div>
            <small>December 2018</small>
          </div>
          <ul>
            <li>Bachelor of Science in Computer Science</li>
            <li>Minor in Mathematics</li>
          </ul>
        </p>
        <p className="bod">
          <h3>Experience</h3>
          <u>Undergraduate Research Assistant</u>
          <div>
            <small>June 2017 - Present</small>
          </div>
          <div>
            Skills Learned
          </div>
          <ul>
            <li>Traffic Monitoring</li>
            <li>Data Collection</li>
            <li>Packet Analysis</li>
            <li>Professional Interaction</li>
          </ul>
          <u>Hashdump Security Club</u>
          <div>
            <small>Officer: August 2017 - Present</small>
          </div>
        </p>
        <p className = "bod">
          <h3>Skills</h3>
          <u>Languages</u>
          <ul><li>Java</li>
            <li>C/C++</li>
            <li>Python</li>
          </ul>
          <u>Courswork</u>
          <ul>
            <li>Software Development with C++</li>
            <li>Operating Systems</li>
            <li>Algorithms and Data Structures</li>
            <li>Intro to Combinatorial Theory</li>
          </ul>
        </p>
      </div>
    )
  }
}

class Main extends React.Component{
  render() {
    return (
      <div className = "resume">
        <Header />
        <hr />
        <Body />
        </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));