import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "../components";
import { Hero } from "../pages";
import { dataActions } from "../redux/reducers/dataSlice";

const RoutePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const toggleTheme = () => {
    dispatch(dataActions.setTheme({ theme: !data.theme }));
  };
  return (
    <div className="flex md:flex-col flex-col-reverse ">
      <Router>
        <Navbar toggleTheme={toggleTheme} theme={data.theme} />
        <div
          className={`${
            data.theme ? "bg-slate-200 text-black" : "bg-black text-white"
          }`}
        >
          <Routes>
            <Route exact path="/" element={<Hero theme={data.theme} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default RoutePage;
