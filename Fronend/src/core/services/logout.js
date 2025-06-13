import Swal from "sweetalert2";

export const logout = async (setUser, navigate) => {
    setUser(null); 

    await Swal.fire({
        title: 'Logged out',
        text: 'You have been successfully logged out.',
        icon: 'info',
        confirmButtonText: 'OK'
    });

    navigate("/"); 
}
