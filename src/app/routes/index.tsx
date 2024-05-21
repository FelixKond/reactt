import { Route, Routes } from "react-router-dom";
import Oleg from "../../pages/Oleg/Oleg";
import Maxim from "../../pages/Maxim/Maxim";
import Sonia from "../../pages/Sonia/Sonia";
import Table from "../../pages/Table/Table";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="Oleg" element={<Oleg />} />
      <Route path="Maxim" element={<Maxim />} />
      <Route path="Sonia" element={<Sonia />} />
      <Route path="table" element={<Table />} />
    </Routes>
  );
};

export default MainRouter;
