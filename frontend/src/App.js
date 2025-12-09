import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PredictionForm from "./PredictionForm"; // your prediction component
import ResultPage from "./ResultPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/predict" element={<PredictionForm />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
