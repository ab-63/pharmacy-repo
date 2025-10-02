import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Autenticate from "./component/Authentication/Authentication";
import AdminPanel from "./component/charts/dashboared/AdminPanel";
import Dashboared from "./component/charts/dashboared/Dashboared";
import Medicine from "./component/charts/dashboared/Medicine";
import Note from "./component/charts/dashboared/note/Note";
import Pahrmacy from "./component/charts/dashboared/Pahrmacy";
import Prescription from "./component/charts/dashboared/prescription/Prescription";
import Purchase from "./component/charts/dashboared/purchase/Purchase";
import Report from "./component/charts/dashboared/report/Report";
import Sales from "./component/charts/dashboared/Sales";
import Stocks from "./component/charts/dashboared/Stocks";
import NotFound from "./component/pages/NotFound";
import Protected from "./component/pages/Protected";
import Loading from "./component/ui/Loading";
import { Context } from "./context/ContextProvider";
function App() {
  const { email, password } = useContext(Context);
  return (
    <div>
      {/* <Protected/> */}
      <Routes>
        <Route path="/login" element={<Autenticate />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<Protected />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboared></Dashboared>}>
          <Route path="/" element={<Stocks />} />
          <Route path="medicine" element={<Medicine />} />
          <Route path="sale" element={<Sales />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="prescription" element={<Prescription />} />
          <Route path="report" element={<Report />} />
          <Route path="admin" element={<AdminPanel/>} />
          <Route path="pharmacy" element={<Pahrmacy/>} />
          <Route path="note" element={<Note/>} />
        </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
