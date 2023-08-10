
import "../components/css/servicebut.css"



export default function ServicesButton(props){    


    return(
        <>
        <a href={props.link} className="button text-white  w-24 h-8 rounded-full outline outline-2 outline-offset-2 outline-white hover:bg-red-800 transition-all cursor-pointer hover:animate-bounce">
            Nos services
        </a>
        </>
    )
}