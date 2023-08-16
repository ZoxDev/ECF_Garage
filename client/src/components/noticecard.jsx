import '../components/css/noticecard.css'

import { useState, useEffect } from 'react';

export default function Noticecard(props) {
    // Get notice in array
    const [notice, setNotice] = useState([]);

    // Request
    const getNotice = async () => {
        try {
            const response = await fetch("http://localhost:5000/noticemessage");
            const jsonData = await response.json();

            setNotice(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Request do once
    useEffect(() => {
        getNotice();
    }, [])

    // Get all the information only when the fetch is ended
    const selectedInfo = notice[props.notid];
    const noticemessage = selectedInfo ? selectedInfo.noticeusermessage : "";
    const noticename = selectedInfo ? selectedInfo.noticeusername : "";
    const noticelastname = selectedInfo ? selectedInfo.noticeuserlastname : "";
    let noticenote = selectedInfo ? selectedInfo.noticeusernote : "";

    // Create an array fill lenght of note and this note contain svg
    const noteArray = Array(noticenote).fill(<svg width="33" height="17" viewBox="0 0 33 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.98411 0.653809C1.70912 0.653809 1.44539 0.786284 1.25095 1.02209C1.0565 1.2579 0.947266 1.57772 0.947266 1.9112C0.947489 2.04996 0.966649 2.18771 1.00397 2.31888L1.01612 2.36308C1.01679 2.36554 1.01746 2.368 1.01814 2.37045L1.98411 5.68339L1.98411 10.713C1.98438 10.8806 2.01229 11.0465 2.06619 11.2008C2.1201 11.3552 2.19891 11.4949 2.29799 11.6118V11.6143L2.31622 11.6339C2.33324 11.6535 2.3508 11.6723 2.36887 11.6904L4.17119 13.633C4.56016 15.5535 5.98966 17 7.68673 17C8.66576 17 9.55667 16.5171 10.212 15.7426H16.4999L22.7877 15.7426C23.4431 16.5171 24.334 17 25.313 17C26.292 17 27.183 16.5171 27.8383 15.7426H28.942C29.0791 15.7425 29.2148 15.7095 29.3413 15.6455C29.4679 15.5814 29.5827 15.4875 29.6791 15.3693L31.7386 12.8717C31.7468 12.862 31.7549 12.8522 31.7629 12.8422V12.8397C31.9482 12.6061 32.052 12.2946 32.0525 11.9704C32.0524 11.7182 31.9898 11.4719 31.8728 11.2634C31.7557 11.055 31.5898 10.894 31.3963 10.8014C30.5754 10.3192 29.3158 9.8578 27.8403 9.45804C27.1848 8.68207 26.2931 8.19819 25.313 8.19819C24.7694 8.19819 24.2569 8.35645 23.7922 8.62059C22.0497 8.35832 20.2434 8.19819 18.5735 8.19819H16.4999V5.68339C16.4999 5.34991 16.3906 5.03009 16.1962 4.79428C16.0017 4.55847 15.738 4.426 15.463 4.426C15.4387 4.42578 15.4144 4.4266 15.3901 4.42845C11.2673 4.44309 7.16831 5.68339 7.16831 5.68339V1.9112C7.16831 1.57772 7.05907 1.2579 6.86462 1.02209C6.67018 0.786284 6.40645 0.653809 6.13147 0.653809L1.98411 0.653809ZM7.68673 10.713C8.55795 10.713 9.24199 11.5425 9.24199 12.5991C9.24199 13.6556 8.55795 14.4852 7.68673 14.4852C6.8155 14.4852 6.13147 13.6556 6.13147 12.5991C6.13147 11.5425 6.8155 10.713 7.68673 10.713ZM25.313 10.713C26.1842 10.713 26.8683 11.5425 26.8683 12.5991C26.8683 13.6556 26.1842 14.4852 25.313 14.4852C24.4418 14.4852 23.7578 13.6556 23.7578 12.5991C23.7578 11.5425 24.4418 10.713 25.313 10.713Z" fill="#ffd500" />
    </svg>);

    return (
        <>
            
            <div className='container-notice'>
            <h1 className='title'>Vos avis !</h1>  
                <div className='card-container'>
                    <h2 className='card-name'>{noticename}<br></br>{noticelastname}</h2>
                    <div className='card-note'>
                        {noteArray}
                    </div>
                    <p className='card-message'>{noticemessage}</p>
                </div>
            </div>
            
        </>
    )
}