/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import '../components/css/schedule.css'
import { useFetch } from '../hooks/queryget';
import Loading from '../components/loading';

export default function Schedule(props) {

    // Get info in an array 
    const [schedule, setSchedule] = useState([]);

  
        const [data, loading, error] = useFetch("/schedule");
        useEffect(() => {
            setSchedule(data)
        }, [data])
    
    
        if (loading) {
            <Loading></Loading>
        }
        if (error) {
            return <p>Error: {error}</p>;
        }
    
    console.log()

    // Check if the value is available
    const selectedSchedule = schedule.find((element) => element.dayname == props.dayid);
    const dayname = selectedSchedule ? selectedSchedule.dayname : "";
    const hourstart = selectedSchedule ? selectedSchedule.hourstart : "";
    const hourpause = selectedSchedule ? selectedSchedule.hourpause : "";
    const hourstoppause = selectedSchedule ? selectedSchedule.hourstoppause : "";
    const hourstop = selectedSchedule ? selectedSchedule.hourstop : "";

    return (
        <>
            <tr >
                <td className="schedule-td">
                    {dayname}
                </td>
                <td className="schedule-td">
                    {hourstart} à {hourpause}
                </td>
                <td className="schedule-td">
                    {hourstoppause} à {hourstop}
                </td>
            </tr>
        </>
    );

}