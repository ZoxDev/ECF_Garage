import './error.css'

// Prop validation
import PropTypes from 'prop-types';

PageForbOrUnauth.propTypes = {
    errName: PropTypes.string.isRequired,
    errInfo: PropTypes.string.isRequired,

};

export default function PageForbOrUnauth(props) {

    return (
        <>
            <section className='error-container'>
                <div className='error-content'>
                    <h1 className='error-hone'>{props.errName}</h1>
                    <p className='error-text'>Il semblerai que vous êtes {props.errInfo} cliquez sur la route</p>
                </div>
                <a className='error-link' href='/'></a>
            </section>
        </>
    )
}