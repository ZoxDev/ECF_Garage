/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './schedule.css'
import { useFetch } from '../../hooks/queryget';
import Loading from "../Loading/loading";

// Props validation
import PropTypes from 'prop-types'

Schedule.propTypes = {
    dayid: PropTypes.number,
};

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
    const hourstart = selectedSchedule ? selectedSchedule.hourstart.split(':').slice(0, 2).join(':') : "";
    const hourpause = selectedSchedule ? selectedSchedule.hourpause.split(':').slice(0, 2).join(':') : "";
    const hourstoppause = selectedSchedule ? selectedSchedule.hourstoppause : "";
    const hourstop = selectedSchedule ? selectedSchedule.hourstop : "";

    let hourStopPause = null;
    let hourStop = null;

    if(hourstoppause != null){
       hourStopPause = hourstoppause.split(':').slice(0, 2).join(':');
    }

    if(hourstop != null){
       hourStop = hourstop.split(':').slice(0, 2).join(':'); 
    }

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
                    {hourStopPause} à {hourStop}
                </td>
            </tr>
        </>
    );
}