import AdminProduct from "../features/admin/components/AdminProduct";
import Navbar from "../features/navbar/Navbar";


export default function AdminHomePage(){
    return(
        <>
        <Navbar>
            <AdminProduct/>
        </Navbar>
        </>
    )
}