import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import ProviderForm from "./Components/Pages/providerForm"
import ProviderList from "./Components/Pages/providerList"
import Home from "./Components/Pages/Home"
import ProviderUpdateForm from "./Components/Pages/providerUpdateForm"
import { ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { toogleTheme } from "./Components/Theme/Store"

function App({fetchProviders}) {

  const theme = useSelector(state => state.theme)

  const dispatch = useDispatch()

  return (
    <div className="container-fluid my-3" style={{
      background: theme === 'light' ? '#fff' : '#000',
      color: theme === 'light' ? '#000' : '#fff',
      height: '100vh'
    }}>
        <Router>

          <ToastContainer />
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="nav-bar nav">
                <Link to="/home" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/add-provider" className="nav-item nav-link">
                  Add Provider
                </Link>
                <Link to="/provider-list" className="nav-item nav-link">
                  Provider List
                </Link>
              </div>
          </nav>

          <main>
            <Routes>
              <Route path="/add-provider" element={<ProviderForm />} />
              <Route path="/provider-list" element={<ProviderList />} />
              <Route path="/edit-provider/:id" element={<ProviderUpdateForm />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>

        </Router>
        <button className="btn btn-primary" onClick={() => dispatch(toogleTheme())}>Change theme</button>
    </div>
  )
}

export default App
