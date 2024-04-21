import "./App.css";
import Home from "./Pages/Home/Home";
import RouteProvider from "./Provider/RouteProvider";

function App() {
  return (
    <RouteProvider>
      <Home />
     
    </RouteProvider>
  );
}

export default App;
