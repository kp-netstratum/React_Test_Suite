import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Apps_list } from "./Apps_list";
import { Home } from "./Components/Home";

function App() {

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-gray-900 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          {Apps_list.map((app) => (
            <Route
            key={app.name}
            path={`/${app.link}`}
            element={<app.component/>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
