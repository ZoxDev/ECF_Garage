/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import '../components/css/schedule.css'

export default function Schedule(props) {

    // Get info in an array 
    const [schedule, setSchedule] = useState([]);

    // Request
    const getSchedule = async () => {
        try {
            const response = await fetch("http://localhost:5000/schedule");
            const jsonData = await response.json();

            setSchedule(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Request do once
    useEffect(() => {
        getSchedule();
    }, [])

    //Check if the value is available
    const selectedSchedule = schedule[props.dayid];
    const dayname = selectedSchedule ? selectedSchedule.dayname : "";
    const hourstart = selectedSchedule ? selectedSchedule.hourstart : "";
    const hourpause = selectedSchedule ? selectedSchedule.hourpause : "";
    const hourstoppause = selectedSchedule ? selectedSchedule.hourstoppause : "";
    const hourstop = selectedSchedule ? selectedSchedule.hourstop : "";


    return (
        <>
            <tr>
                <td>
                    {dayname}
                </td>
                <td>
                    {hourstart}
                </td>
                <td>
                    {hourpause}
                </td>
                <td>
                    {hourstoppause}
                </td>
                <td>
                    {hourstop}
                </td>
            </tr>


        </>
    );

}