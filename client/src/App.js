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
    }
  }

    configResponse(){
        let requestBody = this.state.config;
        const serverURL = 'http://' + location.host + '/config';
        console.log(serverURL);
        return fetch(serverURL, {
            method: "POST",
            body: JSON.stringify(requestBody)
        });

    }

    async config() {
        console.log("Config");
        try {
            let serverResponse = await this.configResponse();
            let conf = await serverResponse.json();
            console.log(conf)
        } catch (err) {
            console.error(err);
        }
    }

  render() {
        this.config();
    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <Application />
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;
