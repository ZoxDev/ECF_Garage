import './loading.css'

export default function Loading(){
    return(
        <>
            <section className="loading-section">
                <div className="random-circle"/>
                <div className="random-circle"/>
                <p className="loading-text">CHARGEMENT 
                    <span className="bounce">.</span>
                    <span className="bounce">.</span>
                    <span className="bounce">.</span>
                </p>
            </section>
        </>
    )
}