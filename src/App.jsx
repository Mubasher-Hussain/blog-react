import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import axios from "./auth/axiosConfig";

import "./App.scss";
import { Login, Register } from "./login/index";
import { logout, useAuth } from "./auth";
import { BlogDetails, BlogsList, NewBlog, EditBlog } from "./blogs";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  // For animating register and login container via onclick
  changeState() {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <Router basename='/static'>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/'><Redirect to='../blogsList'></Redirect></Route>
            <Route exact path="/blogsList/:author?" component={BlogsList}/>
            <Route exact path="/blogDetails/:pk" component={BlogDetails}/>
            <PrivateRoute path="/createPost" component={NewBlog} />
            <PrivateRoute path="/editPost/:pk" component={EditBlog} />

            <Route path="/login">
              <div className="login">
                <div className="container" ref={ref => (this.container = ref)}>
                  {isLogginActive && (
                    <Login containerRef={ref => (this.current = ref)}
                    />
                  )}
                  {!isLogginActive && (
                    <Register containerRef={ref => (this.current = ref)} />
                  )}
                </div>
                <RightSide
                  current={current}
                  currentActive={currentActive}
                  containerRef={ref => (this.rightSide = ref)}
                  onClick={this.changeState.bind(this)}
                />
              </div>
            </Route>

          </Switch>
          
      </div>
      
    </Router>
    );
  }
}


// Container for login and register tab
const RightSide = props => {
  return (
    <div
      className="right-side right"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};


// Navbar for login/logout and display blogs List option
function NavBar () {

  const [logged] = useAuth();
  const history = useHistory();
  function serverLogout() {
    axios
    .get('blogs/api/logout')
    .then(() =>{logout(); history.go(0);}); 
  }
  return (
    <nav class='navbar navbar-expand navbar-dark bg-dark fixed-top'>
      <div class='container'>
        <ul class="navbar-nav mr-auto">

          { logged &&      
            <li class="nav-item">
              <button onClick={() => serverLogout()}>Logout</button>
            </li>
            }
          {!logged && 
            <li class="nav-item">
              <button  onClick={() => history.push('../login')}>Login</button>
            </li>
            }
          <li class="nav-item">
          <button  onClick={() => history.push('../blogsList')}>Posts List</button>
          </li>
          <button onClick={() => history.push('../createPost')}>Create New Blog</button>
        </ul>
      </div>
    </nav>
  );
};


// Reroutes to login page if non authorized user accesses certain elements
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [logged] = useAuth();
  return <Route {...rest} render={(props) => (
    logged
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}

export default App;