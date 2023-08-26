// CSS
import '../components/css/filterbar.css'

// hook
import { useState } from 'react';
import { useFetch } from '../hooks/queryget'

export default function Filterbar(props) {

    // Filter bar state
    const [filterPrice, setPrice] = useState(25000);
    const [filterDate, setDate] = useState();
    const [dieselChecked, setDieselChecked] = useState("");
    const [essenceChecked, setEssenceChecked] = useState("");

    let filterData = []

    // Get the data
    const [data, loading, error] = useFetch("http://localhost:5000/cars")
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    

    // Filter function
    const submitFilter = () => {
        data.forEach(element => {
            let id = data.indexOf(element)
    
            // Console log of all
            console.log(data[id].price)
            console.log(data[id].circulationdate)
            console.log(data[id].engine)
    
            if (filterPrice >= data[id].price){
                filterData = id;
                props.handleCallback(filterData);
            }
        });
    }


    // More filter like only 1 filter filter with that
    
    // Checkbox handlechange
    const clickEssence = () => {
        setDieselChecked("")
        setEssenceChecked('essence')
    }
    const clickDiesel = () => {
        setDieselChecked('Diesel')
        setEssenceChecked("")
    }
    return (
        <>
            <div className='filter-container'>
                <div className='engine-checkbox'>
                    <label >
                        <input onChange={clickDiesel} checked={dieselChecked} type='checkbox' />
                        Diesel
                    </label>
                    <label>
                        <input onChange={clickEssence} checked={essenceChecked} type='checkbox' />
                        Essence
                    </label>
                </div>
                <div className='circu-date'>
                    <input type='number' placeholder='Date' value={filterDate} onChange={e => setDate(e.target.value)} />
                </div>
                <div className='price-range'>
                    <input type="range" id="price" name="prix" min="0" max="50000" value={filterPrice} onChange={e => setPrice(e.target.value)}/>
                    <label htmlFor='price'>Prix</label>
                    <input type='number' placeholder='Prix' value={filterPrice} onChange={e => setPrice(e.target.value)} />
                </div>
                
                <button onClick={submitFilter}>CHERCHER</button>
            </div>
        </>
    )
}