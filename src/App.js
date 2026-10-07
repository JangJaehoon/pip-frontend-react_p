import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetail";
import PostEdit from "./PostEdit";
import Home from "./Home";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/create"} element={<CreatePost/>}/>
            <Route path={"/post/:name"} element={<PostDetail/>}/>
            <Route path={"/post/edit/:name"} element={<PostEdit/>}/>
          </Routes>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    /!*Edit <code>src/App.js</code> and save to reload.*!/*/}
      {/*    Hello Dear*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
        </div>
      </Router>
  );
}
export default App;

//  / - post list
//  /create - post create
//  /edit/:id - post edit
