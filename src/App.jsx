import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import ListEmployee from "./pages/ListEmployee/ListEmployee";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ListEmployee />} />
          <Route path="employee/create" element={<CreateEmployee />} />
          <Route path="employee/:id/edit" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
