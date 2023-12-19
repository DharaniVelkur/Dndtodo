import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Error from "./components/Error";


function App() {
  return (
    <Routes>
      <Route exact path="/body" element={<Body/>} />
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/resetpassword" element={<PasswordReset/>}/>
      <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword/>}/>
      <Route exact path="/*" element={<Error/>} />
  </Routes>
  );
}

export default App;