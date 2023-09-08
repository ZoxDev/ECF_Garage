// Css
import '../../components/css/employee.css'

// Components
import Navbar from '../../components/navbar';

// Utils
import { useFetch } from "../../hooks/queryget";
import { useFetchPost } from '../../hooks/querypost';


export default function EmployeeBack() {

    // Buttons

    return(
        <>
            <section className="employee-container">
                <Navbar/>
                <div className="employee-menu">
                    <h2>Panel</h2>
                    <button className="btn-employee">Voitures</button>
                    <button className="btn-employee">Message Voitures</button>
                    <button className="btn-employee">Avis</button>
                </div>
                <div className="employee-content">

                </div>
            </section>
        </>
    )
}