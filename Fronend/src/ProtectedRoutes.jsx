import { useContext } from "react";
import { Navigate} from "react-router-dom";
import { UserContext } from "./core/contexts/UserContext"; 

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(UserContext);

    // lw l user msh 3amel sign in yroh 3l home page
    if (!user) return <Navigate to="/" replace />;

    //   tb lw 3amel log in bs l role bt3to msh samahah ydkhol 3l path dah 
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/access-denied" replace />;
    }

    //  lw tmam yrg3 ywdeh ll safaha l 3yzha 
    return children;
};

export default ProtectedRoute;
