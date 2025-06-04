import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";

import ProfileUser from "./pages/ProfileUser";
import EditProfileUser from "./pages/EditProfileUser";

import TahapanMekanisme from "./pages/TahapanMekanisme";
import TahapanAudit from "./pages/TahapanAudit";
import TahapanInputAudit from "./pages/TahapanInputAudit";
import TahapanKesimpulan from "./pages/TahapanKesimpulan";
import TahapanTanggalRTM from "./pages/TahapanTanggalRTM";
import TahapanFotoKegiatan from "./pages/TahapanFotoKegiatan";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/profile" element={<ProfileUser />} />
        <Route path="/EditProfileUser" element={<EditProfileUser />} />
        <Route path="/TahapanKesimpulan" element={<TahapanKesimpulan />} />
        <Route path="/TahapanMekanisme" element={<TahapanMekanisme />} />
        <Route path="/TahapanAudit" element={<TahapanAudit />} />
        <Route path="/TahapanInputAudit" element={<TahapanInputAudit />} />
        <Route path="/TahapanTanggalRTM" element={<TahapanTanggalRTM />} />
        <Route path="/TahapanFotoKegiatan" element={<TahapanFotoKegiatan />} />
      </Routes>
    </Router>
  );
}

export default App;
