import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import QuanLySinhVien from "./AxiosQuanLySinhVien/QuanLySinhVien";
import Header from "./Components/Header";

import ChiTietSinhVien from "./PageQuanLySinhVien/ChiTietSinhVien/ChiTietSinhVien";
import Home from "./PageQuanLySinhVien/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/dssv" exact component={QuanLySinhVien} />
        <Route path="/detail/:id" exact component={ChiTietSinhVien} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
    // <div className="App">
    //   <QuanLySinhVien />
    // </div>
  );
}

export default App;
