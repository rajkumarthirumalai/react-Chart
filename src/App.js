import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Parse from 'parse/dist/parse.min.js';
import Home from "./pages/Home";
import Main from "./pages/Main";
import Tradetron from "./pages/Tradetron";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Strategies from "./pages/Strategies";
import SubscribeComp from './pages/Subscribe';
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = '123';
const PARSE_HOST_URL = 'http://localhost:1337/parse';
const PARSE_MASTER_KEY = '123';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_MASTER_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
        <Switch>
          <Route path="/Postdetails">
            <Home />
          </Route>
          <Route path="/tradetron">
            <Tradetron />
          </Route>
          <Route path="/tradetronStrategy">
            <Strategies />
          </Route>
          <Route path="/stockgraph">
            <SubscribeComp />
          </Route>
          <Route path="/">
          <Main/>
          </Route>
        </Switch>
      </Router>
    </div>
    </LocalizationProvider>
  );
} 

export default App;