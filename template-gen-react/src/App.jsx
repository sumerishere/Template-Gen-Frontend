import "./App.css";
import { Route, Routes } from "react-router-dom";
import DynamicForm from "./components/template-fom/TemplateComp";
import TemplateCreated from "./components/created-templates/CreatedTemplate";

function App() {
  return (
    <>
      <div>
        
        <Routes>
          <Route path="/" element={<DynamicForm />}></Route>
          <Route path="/TemplateCreated" element={<TemplateCreated />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
