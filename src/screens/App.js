import '../style/App.css';

import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import Question from "./Question"
import Frameworks from "./Framework"
import Result from "./Result"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://blog.9fin.com/images/logo_hu44508be6a7b00260df926a79e3f86045_4609_0x70_resize_lanczos_2.png" alt="logo" className="logo" />
      </header>

      <div className="main_body">
        <Router>
          <Routes>
            <Route path="/" element={<Frameworks />} />
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/results" element={<Result />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
