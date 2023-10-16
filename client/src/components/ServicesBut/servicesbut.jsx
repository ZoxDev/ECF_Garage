/* eslint-disable react/prop-types */

import "./servicebut.css"



export default function ServicesButton(props) {
    return (
        <>
            <div className="btn-container">
                <a href={props.link} className="button text-white  w-24 h-8 rounded-full outline outline-2 outline-offset-2 outline-whit md:w-32 text-lg h-14" >
                    Nos services
                </a>
            </div>
        </>
    )
}