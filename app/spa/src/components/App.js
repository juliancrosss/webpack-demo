import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Nav from './Nav';
import BorderBottom from './BorderBottom';
import WrapperContent from './Routes/WrapperContent';
import AboutContent from './Routes/AboutContent';
import FooterPage from './FooterPage';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Router>
          <div>
            <Nav />
            {/*<PageWrapper />*/}
            <div id="page-wrapper" className="gray-bg">
              <BorderBottom />
                <Route exact path="/" component={WrapperContent}/>
                <Route path="/about" component={AboutContent}/>
              <FooterPage />
            </div>
           </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
export default App;