import { Navigate, useLocation } from "react-router-dom"
// import Helpers from "src/commons/helpers"
import Screens from "../../constants/screens"
import { getToken } from "../useLocalStorage";
const PrivateRoute = ({ children }) => {
    // const isLoggedIn = Helpers.isLoggedIn();
    const location = useLocation();

    if (!getToken()) {
        return <Navigate to={Screens.LOGIN} state={{ from: location }} />
    }

    return children;
}

export default PrivateRoute