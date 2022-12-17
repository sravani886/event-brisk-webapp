import React, { Component } from 'react';
import Footer from './footer';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
          {this.props.children}
        <Footer/>
      </div>
    );
  }
}
