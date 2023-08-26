/* eslint-disable react/jsx-key */
// Css
import '../components/css/carspage.css'

// components
import Navbar from '../components/navbar'
import Carscard from '../components/carscard'
import Filterbar from '../components/filterbar'


// Utilities
import Footer from './footer'
import { useFetch } from '../hooks/queryget'
import styled from 'styled-components'



// Stled div
const FilterComp = styled.div`
    
`


const NormalCard = styled.div`
    visibility: hidden;
`

export default function CarsPage(props) {



    // Get all the cars
    const [data, loading, error] = useFetch("http://localhost:5000/cars")

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const length = data.length;



    // Filter index
    function CallBack(filterData) {
        console.log(filterData)
        const filter = []

        // When the number of car filtered is < to the lenght of the array push the array index number to get the car
        while (filter.length < filterData + 1) {
            filter.push(filter.length)
        }

        filter.forEach(element => {
            console.log(data[element])
        });

        return (
            <>
                <FilterComp>
                    <section className='cars-card-container'>
                        {filter.map(element => (
                            <div className='multiple-div-card'>
                                <Carscard carid={data[element]}></Carscard>
                            </div>
                        ))}
                    </section>
                </FilterComp>
            </>
        )
    }

    // Basic render
    return (
        <>
            <Navbar />
            <section className='page-container'>
                <div className='search-bar'>
                    <Filterbar handleCallback={CallBack} />
                </div>
                <FilterComp></FilterComp>
                <NormalCard>
                    <section className='cars-card-container'>
                        {data.map(length => (
                            <div className='multiple-div-card'>
                                <Carscard carid={data.indexOf(length)}></Carscard>
                            </div>
                        ))}
                    </section>
                </NormalCard>
            </section>
            <Footer></Footer>
        </>
    )
}