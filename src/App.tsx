import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "./components/Navbar";
import MainRouter from "./app/routes";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <MainRouter />
      </div>
    </Router>
  );
};

export default App;
