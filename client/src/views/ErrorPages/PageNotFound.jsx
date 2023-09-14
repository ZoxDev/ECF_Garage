import '../../components/css/error.css'

export default function PageNotFound() {

    return (
        <>
            <section className='error-container'>
                <div className='error-content'>
                    <h1 className='error-hone'>404</h1>
                    <p className='error-text'>La page que vous cherchez n'existe pas...<br /> Cliquez sur la route pour retrouver votre chemin</p>
                </div>
                <a className='error-link' href='/'></a>
            </section>

        </>
    )
}