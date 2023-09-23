import AllRoutes from "./AllRoutes";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
import { fetchAllQuestion } from "./actions/question.js";
import { fetchAllUsers } from "./actions/users.js";


function App() {
  const dispatch = useDispatch()
useEffect(() => {
  dispatch(fetchAllQuestion())
  dispatch(fetchAllUsers())
}, [dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
