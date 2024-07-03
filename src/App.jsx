import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import ProviderForm from "./Components/Pages/providerForm"
import ProviderList from "./Components/Pages/providerList"
import Home from "./Components/Pages/Home"
import ProviderUpdateForm from "./Components/Pages/providerUpdateForm"
import { ToastContainer } from "react-toastify"

function App({fetchProviders}) {

  return (
    <div className="container-fluid my-3">
        <Router>

          <ToastContainer />

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">Mande</a>
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
    </div>
  )
}

export default App
