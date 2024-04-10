import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogListing from "./BlogListing";
import BlogCreate from "./BlogCreate";
import BlogDetail from "./BlogDetail";
import BlogEdit from "./BlogEdit";

function App() {
  return (
    <div className="App">
      <h1 className="text-center">React JS CRUD Opertations</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogListing />}></Route>
          <Route path="/blogCreate" element={<BlogCreate />}></Route>
          <Route path="/blogEdit/:empid" element={<BlogEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
