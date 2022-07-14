import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "../components";
import { Hero } from "../pages";

const RoutePage = () => {
  const { data } = useSelector((state) => state);

  return (
    <div className="flex md:flex-col flex-col-reverse ">
      <Router>
        <Navbar />
        <div
          className={`${
            data.theme ? "bg-slate-200 text-black" : "bg-black text-white"
          }`}
        >
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route path="/:id" element={<Hero />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default RoutePage;
