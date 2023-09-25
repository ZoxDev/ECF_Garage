import '../components/css/filterbar.css'


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
                    <input type='text' placeholder='Diesel ou Essence ?' value={props.myEngine} onChange={e => props.myEngineFunc(e.target.value)}></input>
                </label>

            </div>
     
        </>
    )
}