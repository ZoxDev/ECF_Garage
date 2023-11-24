import './filterbar.css'

// Props validation
import PropTypes from 'prop-types'

FilterBar.propTypes = {
    myPrice: PropTypes.number,
    myCircu: PropTypes.number,
    myDist: PropTypes.number,
    myEngine: PropTypes.string,
    myPriceFunc: PropTypes.func,
    myCircuFunc: PropTypes.func,
    myDistFunc: PropTypes.func,
    myEngineFunc: PropTypes.func,
};

export default function FilterBar(props) {
    return (
        <>
            <div className="filter-container">
                <label className='label-filter'>
                    Prix
                    <input type='number' placeholder='Votre prix' value={props.myPrice} onChange={e => props.myPriceFunc(e.target.value)}></input>
                </label>
                <label className='label-filter'>
                    Circulation
                    <input type='number' placeholder='2023 max' value={props.myCircu} onChange={e => props.myCircuFunc(e.target.value)}></input>
                </label>
                <label className='label-filter'>
                    Kilomètrage
                    <input type='number' placeholder='Nombre de kilomètre' value={props.myDist} onChange={e => props.myDistFunc(e.target.value)}></input>
                </label>
                <label className='label-filter'>
                    Carburant
                    <select name="carburant" id="pet-select" value={props.myEngine} onChange={e => props.myEngineFunc(e.target.value)}>
                        <option value="">Choisissez votre carburant</option>
                        <option value="Essence">Essence</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Électrique">Électrique</option>
                    </select>
                </label>

            </div>

        </>
    )
}