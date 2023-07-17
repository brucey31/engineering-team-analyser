import '../style/App.css';

import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import Question from "./Question"
import Frameworks from "./Framework"
import Result from "./Result"

function App() {
  return (
    <div className="App">
      <header className="App-header">


      <img src="https://app.esgbook.com/assets/logos/esgbook_logo.png" alt="logo" className="esgbook-logo" />
        <p>
          Hello there
        </p>

      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Frameworks />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/results" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
