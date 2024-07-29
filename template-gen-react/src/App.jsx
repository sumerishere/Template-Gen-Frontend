import "./App.css";
import { Route, Routes } from "react-router-dom";
import DynamicForm from "./components/template-fom/TemplateComp";
import TemplateCreated from "./components/created-templates/CreatedTemplate";
import LoginComponent from "./components/Login-form/LoginComp";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LoginComponent/>}></Route>
          <Route path="/DynamicForm" element={<DynamicForm />}></Route>
          <Route path="/TemplateCreated" element={<TemplateCreated />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
