import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./Body";
import Login from "./Login";
import Feed from "./Feed";
import Profile from "./Profile";
import Requests from "./Requests";
import Connections from "./Connections";
import SignUp from "./SignUp";

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='' element={<Feed />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='request' element={<Requests />} />
          <Route path='connections' element={<Connections />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
