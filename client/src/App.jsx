
import './App.css'
import Home from './Pages/Home'
import RouteProvider from './components/Provider/RouteProvider'



function App() {

  return (
    <RouteProvider>
      <Home/>
    </RouteProvider>
  )
}

export default App
