import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components";
import { Hero, Login } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

const RoutePage = () => {
  const { data, auth } = useSelector((state) => state);

  return (
    <div className="flex md:flex-col flex-col-reverse ">
      <Navbar />
      <div
        className={`${
          data.theme ? "bg-slate-200 text-black" : "bg-black text-white"
        }`}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={<PrivateRoute isAuth={auth.isAuthenticated} />}
          >
            <Route exact path="/" element={<Hero />} />
            <Route path="/:id" element={<Hero />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default RoutePage;
