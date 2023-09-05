// Pages
import Homepage from "./views/homepage"
import CarsPage from "./views/carspage"
import Noticepage from "./views/noticepage"

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

function App() {

  return (
    <>
     <Homepage></Homepage>
    </>
  )
}

export default App
