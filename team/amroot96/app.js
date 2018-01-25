class Header extends React.Component{
  render(){
    return (
      <center>
      <h1>Angela Root</h1>
      </center>
    )
  }
}

class Info extends React.Component{
  render(){
    return (
      <div>
        <p className="lead">
          <center>
          <small>2725 Dundee Ct. Fort Collins, CO 80525</small><div></div>
          <small>(720) 244 6463</small><div></div>
        <small>amroot@rams.colostate.edu</small>
          </center>
        </p>
      </div>
    )
  }
}

class Objective extends React.Component{
  render(){
    return (
      <div>
        <p className="lead">
          <h5>Objective</h5>
        <ul>
          <li>Driven computer science major seeking to advance my skills in teamwork and creativity, as well as refine my programming skills.</li>
        </ul>
        </p>
      </div>
    )
  }
}

class Education extends React.Component{
  render(){
    return (
      <div>
        <p className="lead">
          <h5>Education</h5>
        <h6>Colorado State University<small>- Bachelor of Science in Computer Science</small></h6>
        <small>August 2014 - December 2018</small>
        <ul>
          <li>Focusing on big data.</li>
          <li>Relevant coursework: Software Development with C++; Operating systems; Algorithms and data structures.</li></ul>
        </p>
      </div>
    )
  }
}

class Skills extends React.Component{
  render(){
    return(
      <div>
        <p className="lead">
          <h5>Skills</h5>
        <ul>
          <li>Microsoft Word, Excel, Eclipse, SQL, C++, C#, Visual Studio.</li>
          <li>Time management.</li>
          <li>Can work independently and/or a team.</li></ul>
        </p>
      </div>
    )
  }
}

class Experience extends React.Component{
  render(){
    return (
      <div>
        <p className="lead">
          <h5>Experience</h5>
        <h6>Smashburger, Fort Collins <small>- Shift Leader</small></h6>
        <small>October 2015 - PRESENT</small>
        <ul>
          <li>Effective leadership skills to uphold restaurant standards.</li>
          <li>Problem solving in a fast paced environment.</li>
          <li>Multitasking between working with staff and customers</li>
          <li>Troubleshooting POS when malfunctions occur.</li></ul>
        <h6>ROSS, Aurora <small>- Sales Associate</small></h6>
        <small>March 2015 - August 2015</small>
        <ul>
          <li>Worked as a team to deliver a quality customer experience</li></ul>
        </p>
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Header />
        <Info />
        <Objective />
        <Education />
        <Skills />
        <Experience />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
