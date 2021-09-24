import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React, { Suspense, lazy } from "react";

const Gasstations = lazy(() => import('./components/gasstations'));
const Gasstation = lazy(() => import('./components/gasstation'));
const Privacy = lazy(() => import('./components/privacypolicy'));

function App() {
  return (
    <div className="App">
      <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Gasstations}></Route>
            <Route exact path="/station/:id/:name/:stationtype" component={Gasstation}></Route>
            <Route exact path="/privacy" component={Privacy}></Route>
          </Switch>
        </Suspense>
      </Router>
      </div>
    </div>
  );
}

export default App;
