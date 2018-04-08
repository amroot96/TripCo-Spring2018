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
        const serverURL = 'http://' + location.host + '/config';
        return fetch(serverURL, {
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
