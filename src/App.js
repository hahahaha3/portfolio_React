import Main from './components/main/Main';

import Footer from "./components/common/Footer";
import Header from "./components/common/Header";

import About from "./components/sub/About";
import Community from "./components/sub/Community";
import Gallery from "./components/sub/Gallery";
import Join from "./components/sub/Join";
import Location from "./components/sub/Location";
import Youtube from "./components/sub/Youtube";

import './scss/style.scss';
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Main}></Route>
        <Route path='/' component={() => <Header type={'sub'} />} />
      </Switch>
      <Route path='/about' component={About}></Route>
      <Route path='/community' component={Community}></Route>
      <Route path='/gallery' component={Gallery}></Route>
      <Route path='/youtube' component={Youtube}></Route>
      <Route path='/location' component={Location}></Route>
      <Route path='/join' component={Join}></Route>
      <Footer />
    </div>
  );
}

export default App;