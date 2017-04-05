import React, { Component } from 'react';
import BorderBottom from './BorderBottom';
import WrapperContent from './WrapperContent';
import FooterPage from './FooterPage';

class PageWrapper extends Component {
  render() {
    return (
      <div id="page-wrapper" className="gray-bg">
        <BorderBottom />
        <WrapperContent />
        <FooterPage />
      </div>
    );
  }
}

export default PageWrapper;