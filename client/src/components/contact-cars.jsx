import '../components/css/contactcars.css'
import styled from 'styled-components'

import { useState } from 'react';

export default function Contactcars(props) {

    const [modal, setModal] = useState('');

    const toogleModal = () => {
        setModal(!modal);
    }

    // Styled div
    const MyModal = styled.div`
       display: ${modal ? `block` : `none`};
    `

    return (
        <>
            <div className='btn' onClick={toogleModal}>
                CONTACTEZ
            </div>
            <MyModal>
                <div className='modal'>
                    <div className='modal-header'>
                        <h3>Vous souhaitez en savoir plus sur là {props.carName} ?</h3>
                    </div>
                    <form className='modal-form'>
                        <div className='input-text'>
                            <h4 className='name-text'>Nom</h4>
                            <input placeholder='Nom' type='text'/>
                        </div>
                        <div className='input-text'>
                            <h4 className='name-text'>Prénom</h4>
                            <input placeholder='Prénom' type='text'/>
                        </div>
                        <div>
                            <textarea className='text-area' placeholder='Votre message' />
                        </div>

                    </form>
                </div>
            </MyModal>
        </>
    );
}
