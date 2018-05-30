import React, { Component } from 'react';

class Pages extends Component {

  //Handler to get page
  getPages(WPpages){
    let pages = WPpages;
    //console.log(pages);

    let title = pages.title.rendered;
    let content = pages.content.rendered;
    let id = pages.id;

    return (
      <div key={id}>
        <h3 className="content">{title}</h3>
        <div className="content" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }


  render() {
    let pages;
    // If object is set, get page
    if (Object.keys(this.props.pages).length !== 0)
    {
      // If object is in an array
      if (this.props.pages.constructor === Array)
      {
        // Get first position of array
        pages = this.getPages(this.props.pages[0]);
      } else {
        // Else object is just an object and can be passed straight through
        pages = this.getPages(this.props.pages);
      }
    }

    return (
      <div id="pages">
        {pages}
      </div>
    );
  }
}

export default Pages;
