import React, { Component } from 'react';

class Header extends Component {

  //Handler for menu buttons
  handleMenu(id, e){
    e.preventDefault();

    //Send update request to app.js
    this.props.updatePage(id);
  }

  // Get header
  getHeader(){
    // Add title to site from WordPress
    let head = document.querySelector('head');
    let siteTitle = document.createElement('title');
    siteTitle.innerHTML = this.props.pageHeader.name;
    head.append(siteTitle);

    // Create the header's title elements
    // Home link needs to be static, as WP link sends you to the WP page
    return(
      <div id="title">
        <h1><a href="http://192.96.48.103:3000">{this.props.pageHeader.name}</a></h1>
        <h3>{this.props.pageHeader.description}</h3>
      </div>
    );
  }

  // Get menu
  getMenu(id){
    let menu = this.props.pageMenu;

    // Map menu buttons, make in to a list
    menu = menu.map(x => {
      let activeClass = "nav-item";

      // Set currently loaded page as active
      if (Object.keys(this.props.currentPage).length !== 0)
      {
        let pageId;
        if (this.props.currentPage.constructor === Array)
        {
          pageId= this.props.currentPage[0].id;
        } else {
          pageId = this.props.currentPage.id;
        }

        // If this id === current pages id, add "active" to classes
        if (pageId === parseInt(x.object_id, 10))
        {
          activeClass += " active";
        }
      }

      return (
        <li key={x.ID} className={activeClass}>
          <a className="nav-link" id={x.object_id} onClick={this.handleMenu.bind(this, x.object_id)}>
            {x.title}
          </a>
        </li>
      );
    });

    // Add bootstrap nav wrapper to menu and return
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {menu}
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    let header;
    let menu;

    //Check if header and menu are set
    if (Object.keys(this.props.pageHeader).length !== 0)
    {
      header = this.getHeader();
    }

    if (Object.keys(this.props.pageMenu).length !== 0)
    {
      menu = this.getMenu();
    }
    return (
      <div id='header'>
        {header}
        {menu}
      </div>
    );
  }
}

export default Header;
