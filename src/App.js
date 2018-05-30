import React, { Component } from 'react';
import GetPages from './Components/GetPages';
import GetWpHeader from './Components/GetWpHeader';
import './App.css';

//Set the address for wordpress
const wp_address = "http://192.96.48.103:8080";

class App extends Component {
  //Set initial projects container to App state
  constructor()
  {
    super();

    // Set containers
    this.state = {
      WPpage: {},
      menu: {},
      pages: {},
      page_content: {}
    }
  }

  //Get initial page data from WordPress
  componentDidMount()
  {
    this.GetWPjson(wp_address + "/WP/wp-json/", 'WPpage');
    this.GetWPjson(wp_address + "/WP/wp-json/custom-routes/menu", 'menu');
    // Get homepage by name
    this.GetWPjson(wp_address + "/WP/wp-json/wp/v2/pages/?slug=home", 'pages', true);
    //this.GetWPjson(wp_address + "/WP/wp-json/custom-routes/content", 'page_content');
  }

  // Function to fetch data
  GetWPjson (url, state, page) {
    let dataURL = url;
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      // Set data in to state
      this.setState({ [state] : res});
    });
  }

  // Handler for menu
  updatePage(id){
    // Update page content according to menu click by id
    this.GetWPjson(wp_address + "/WP/wp-json/wp/v2/pages/" + id, 'pages', true);
  }

  render() {
    return (
      <div className="App">
        <iframe id="myiframe" src="http://192.96.48.103:8080/WP/cf-api/CF5b0808f115a35/" title="contact" />
        <GetWpHeader pageHeader={this.state.WPpage} pageMenu={this.state.menu} currentPage={this.state.pages} updatePage={this.updatePage.bind(this)} />
        <GetPages pages={this.state.pages} />
      </div>
    );
  }
}

export default App;
