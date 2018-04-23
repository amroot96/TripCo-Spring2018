import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "07",
      name: "Jackalope",
        config: {
            type: "config",
            version: 0,
            optimization: 0
        },
      serverHost: "http://kiwis.cs.colostate.edu:31407"
    }
    this.config = this.config.bind(this);
    this.configResponse = this.configResponse.bind(this);
    this.updateServerHost= this.updateServerHost.bind(this);
  }

    configResponse(){
        const serverURL = this.state.serverHost + '/config';
        return fetch(serverURL, {
            header: {'Access-Control-Allow-Origin':'*'},
            method: "GET",
        });

    }

    async config() {
        try {
            let serverResponse = await this.configResponse();
            let conf = await serverResponse.json();
            console.log(conf)
        } catch (err) {
            console.error(err);
        }
    }

    updateServerHost(arg){
        this.setState({serverHost: 'http://' + arg});
        return true;
    }

  render() {
        this.config();

    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <Application updateServer={this.updateServerHost} serverHost={this.state.serverHost}/>
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
