import './App.css';

import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectRoute';
import Screens from './constants/screens';
//screen
import MainLayout from "./components/MainLayout"
import Login from "./screens/auth/login"
// import Dashboard from "./screens/dashboard/dashboard"
import Account from "./screens/account"
import Profile from "./screens/profile"
import Post from "./screens/post"
import Zoning from "./screens/zoning"
import Loading from "./screens/Loading"
import HandleAccount from "./screens/account/handleAccount"
import Database from "./screens/database"
import HandleZoning from "./screens/zoning/handleZoning"
import Statistics from "./screens/statistics"
import Page404 from "./screens/page404/Page404"

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } >
          <Route
            path={Screens.ACCOUNT}
            element={<Account />}
          />
          <Route
            path={Screens.POST}
            element={<Post />}
          />
          <Route
            path={Screens.ZONING}
            element={<Zoning />}
          />
          <Route
            path={Screens.PROFILE}
            element={<Profile />}
          />
          <Route
            path={Screens.LOADING}
            element={<Loading />}
          />
          <Route
            path={Screens.HANDLE_ACCOUNT}
            element={<HandleAccount />}
          />
          <Route
            path={Screens.DATABASE}
            element={<Database />}
          />
          <Route
            path={Screens.HANDLE_ZONING}
            element={<HandleZoning />}
          />
          <Route
            path={Screens.STATISTICS}
            element={<Statistics />}
          />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
