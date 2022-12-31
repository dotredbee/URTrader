import Router from "./Router";
import "./index.css"
import { AuthMainPovider } from "./Context/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthMainPovider>
        <Router />
      </AuthMainPovider>
    </div>
  );
}
if(!window.location.hash || window.location.hash === "#/"){
  window.location.hash = "#/home"
}

export default App;
