// Css
import './admin.css'

// Components
import DashNav from './component/DashNav/DashNav';
import Cars from './component/Car/Car';
import CarMessage from './component/CarMessage/Carmessage';
import Notice from './component/Notice/Notice';
import Navbar from '../../components/Navbar/navbar';

// Utils
import { useState } from 'react';

export default function AdminBack() {
    // UseState
    const [selectPanel, setSelectPanel] = useState("");

    // Buttons
    const onClickButton = event => {
        setSelectPanel(event.currentTarget.id);
    }
    // Get the id and Show the good panel
    const ShowPanel = () => {
        switch (selectPanel) {
            case "cars":
                return <Cars />
            case "carsmessage":
                return <CarMessage />
            case "notice":
                return <Notice />
            default:
                return <Cars />
        }
    }

    // THE PAGE
    return (
        <>
            <section className="admin-container">
                <Navbar />
                <DashNav/>
                {/* Mobile */}
                <div className="admin-menu-mobile">
                    <button onClick={onClickButton} id='cars' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.5558 6.58748H23.4376L22.5709 4.42082C21.6803 2.19321 19.5547 0.75415 17.1553 0.75415H10.5407C8.14173 0.75415 6.01568 2.19321 5.12454 4.42082L4.25787 6.58748H1.14016C0.733392 6.58748 0.434955 6.96978 0.533913 7.36405L0.846413 8.61405C0.915684 8.89217 1.16568 9.08748 1.45266 9.08748H2.49798C1.7985 9.69842 1.34798 10.5864 1.34798 11.5875V14.0875C1.34798 14.9271 1.66881 15.6849 2.18131 16.2713V19.0875C2.18131 20.0078 2.92766 20.7541 3.84798 20.7541H5.51464C6.43495 20.7541 7.18131 20.0078 7.18131 19.0875V17.4208H20.5146V19.0875C20.5146 20.0078 21.261 20.7541 22.1813 20.7541H23.848C24.7683 20.7541 25.5146 20.0078 25.5146 19.0875V16.2713C26.0271 15.6854 26.348 14.9276 26.348 14.0875V11.5875C26.348 10.5864 25.8975 9.69842 25.1985 9.08748H26.2438C26.5308 9.08748 26.7808 8.89217 26.8501 8.61405L27.1626 7.36405C27.261 6.96978 26.9626 6.58748 26.5558 6.58748ZM8.21933 5.65884C8.59902 4.70988 9.51829 4.08748 10.5407 4.08748H17.1553C18.1777 4.08748 19.0969 4.70988 19.4766 5.65884L20.5146 8.25415H7.18131L8.21933 5.65884ZM5.51464 14.0771C4.51464 14.0771 3.84798 13.4125 3.84798 12.4156C3.84798 11.4187 4.51464 10.7542 5.51464 10.7542C6.51464 10.7542 8.01464 12.2495 8.01464 13.2463C8.01464 14.2432 6.51464 14.0771 5.51464 14.0771ZM22.1813 14.0771C21.1813 14.0771 19.6813 14.2432 19.6813 13.2463C19.6813 12.2495 21.1813 10.7542 22.1813 10.7542C23.1813 10.7542 23.848 11.4187 23.848 12.4156C23.848 13.4125 23.1813 14.0771 22.1813 14.0771Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='carsmessage' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8916 3.10831C13.5243 1.73206 11.7197 0.875989 9.78883 0.687679C7.85798 0.49937 5.92193 0.990626 4.31446 2.07675C2.70699 3.16288 1.52884 4.77582 0.983113 6.63749C0.437387 8.49916 0.558289 10.4929 1.32498 12.275C1.40488 12.4406 1.4311 12.6271 1.39998 12.8083L0.666643 16.3333C0.63839 16.4685 0.644159 16.6085 0.683433 16.7409C0.722706 16.8732 0.794253 16.9938 0.891643 17.0916C0.97148 17.1709 1.06654 17.2332 1.17109 17.2747C1.27564 17.3162 1.38752 17.3362 1.49998 17.3333H1.66664L5.23331 16.6166C5.41458 16.5948 5.59841 16.6207 5.76664 16.6916C7.54873 17.4583 9.54246 17.5792 11.4041 17.0335C13.2658 16.4878 14.8787 15.3096 15.9649 13.7022C17.051 12.0947 17.5422 10.1586 17.3539 8.22779C17.1656 6.29695 16.3096 4.4923 14.9333 3.12498L14.8916 3.10831ZM5.66664 9.83331C5.50182 9.83331 5.34071 9.78444 5.20367 9.69287C5.06663 9.6013 4.95982 9.47115 4.89674 9.31888C4.83367 9.16661 4.81717 8.99905 4.84932 8.8374C4.88148 8.67575 4.96084 8.52727 5.07739 8.41072C5.19393 8.29418 5.34242 8.21481 5.50407 8.18266C5.66572 8.1505 5.83327 8.167 5.98555 8.23008C6.13782 8.29315 6.26797 8.39996 6.35953 8.537C6.4511 8.67404 6.49998 8.83516 6.49998 8.99998C6.49998 9.22099 6.41218 9.43295 6.2559 9.58923C6.09962 9.74551 5.88766 9.83331 5.66664 9.83331ZM8.99998 9.83331C8.83516 9.83331 8.67404 9.78444 8.537 9.69287C8.39996 9.6013 8.29315 9.47115 8.23008 9.31888C8.167 9.16661 8.1505 8.99905 8.18265 8.8374C8.21481 8.67575 8.29418 8.52727 8.41072 8.41072C8.52726 8.29418 8.67575 8.21481 8.8374 8.18266C8.99905 8.1505 9.16661 8.167 9.31888 8.23008C9.47115 8.29315 9.6013 8.39996 9.69287 8.537C9.78443 8.67404 9.83331 8.83516 9.83331 8.99998C9.83331 9.22099 9.74551 9.43295 9.58923 9.58923C9.43295 9.74551 9.22099 9.83331 8.99998 9.83331ZM12.3333 9.83331C12.1685 9.83331 12.0074 9.78444 11.8703 9.69287C11.7333 9.6013 11.6265 9.47115 11.5634 9.31888C11.5003 9.16661 11.4838 8.99905 11.516 8.8374C11.5481 8.67575 11.6275 8.52727 11.7441 8.41072C11.8606 8.29418 12.0091 8.21481 12.1707 8.18266C12.3324 8.1505 12.4999 8.167 12.6522 8.23008C12.8045 8.29315 12.9346 8.39996 13.0262 8.537C13.1178 8.67404 13.1666 8.83516 13.1666 8.99998C13.1666 9.22099 13.0788 9.43295 12.9226 9.58923C12.7663 9.74551 12.5543 9.83331 12.3333 9.83331Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='notice' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 211 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M29.3342 37.4456H138.838" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 69.8912H133.16" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 102.337H98.7261" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 134.783H78.8418" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 167.228H70.4834" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M103.839 157.965L126.812 149.988L190.04 86.7592L163.864 60.5833L100.636 123.812L92.6304 146.812L103.839 157.965Z" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M174.383 50.0642L180.692 43.7559L206.868 69.9318L200.25 76.5499" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M102.164 122.284L128.339 148.46" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M92.6469 146.758L87.0378 163.586L103.902 157.939" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M146.871 79.1473L172.025 104.3" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M163.172 136.214V199.674H5V5H163.172V39.2946" stroke="black" strokeWidth="8.19496" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* DeskTop */}
                <div className="admin-menu-desktop">
                    <button onClick={onClickButton} id='cars' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.5558 6.58748H23.4376L22.5709 4.42082C21.6803 2.19321 19.5547 0.75415 17.1553 0.75415H10.5407C8.14173 0.75415 6.01568 2.19321 5.12454 4.42082L4.25787 6.58748H1.14016C0.733392 6.58748 0.434955 6.96978 0.533913 7.36405L0.846413 8.61405C0.915684 8.89217 1.16568 9.08748 1.45266 9.08748H2.49798C1.7985 9.69842 1.34798 10.5864 1.34798 11.5875V14.0875C1.34798 14.9271 1.66881 15.6849 2.18131 16.2713V19.0875C2.18131 20.0078 2.92766 20.7541 3.84798 20.7541H5.51464C6.43495 20.7541 7.18131 20.0078 7.18131 19.0875V17.4208H20.5146V19.0875C20.5146 20.0078 21.261 20.7541 22.1813 20.7541H23.848C24.7683 20.7541 25.5146 20.0078 25.5146 19.0875V16.2713C26.0271 15.6854 26.348 14.9276 26.348 14.0875V11.5875C26.348 10.5864 25.8975 9.69842 25.1985 9.08748H26.2438C26.5308 9.08748 26.7808 8.89217 26.8501 8.61405L27.1626 7.36405C27.261 6.96978 26.9626 6.58748 26.5558 6.58748ZM8.21933 5.65884C8.59902 4.70988 9.51829 4.08748 10.5407 4.08748H17.1553C18.1777 4.08748 19.0969 4.70988 19.4766 5.65884L20.5146 8.25415H7.18131L8.21933 5.65884ZM5.51464 14.0771C4.51464 14.0771 3.84798 13.4125 3.84798 12.4156C3.84798 11.4187 4.51464 10.7542 5.51464 10.7542C6.51464 10.7542 8.01464 12.2495 8.01464 13.2463C8.01464 14.2432 6.51464 14.0771 5.51464 14.0771ZM22.1813 14.0771C21.1813 14.0771 19.6813 14.2432 19.6813 13.2463C19.6813 12.2495 21.1813 10.7542 22.1813 10.7542C23.1813 10.7542 23.848 11.4187 23.848 12.4156C23.848 13.4125 23.1813 14.0771 22.1813 14.0771Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='carsmessage' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8916 3.10831C13.5243 1.73206 11.7197 0.875989 9.78883 0.687679C7.85798 0.49937 5.92193 0.990626 4.31446 2.07675C2.70699 3.16288 1.52884 4.77582 0.983113 6.63749C0.437387 8.49916 0.558289 10.4929 1.32498 12.275C1.40488 12.4406 1.4311 12.6271 1.39998 12.8083L0.666643 16.3333C0.63839 16.4685 0.644159 16.6085 0.683433 16.7409C0.722706 16.8732 0.794253 16.9938 0.891643 17.0916C0.97148 17.1709 1.06654 17.2332 1.17109 17.2747C1.27564 17.3162 1.38752 17.3362 1.49998 17.3333H1.66664L5.23331 16.6166C5.41458 16.5948 5.59841 16.6207 5.76664 16.6916C7.54873 17.4583 9.54246 17.5792 11.4041 17.0335C13.2658 16.4878 14.8787 15.3096 15.9649 13.7022C17.051 12.0947 17.5422 10.1586 17.3539 8.22779C17.1656 6.29695 16.3096 4.4923 14.9333 3.12498L14.8916 3.10831ZM5.66664 9.83331C5.50182 9.83331 5.34071 9.78444 5.20367 9.69287C5.06663 9.6013 4.95982 9.47115 4.89674 9.31888C4.83367 9.16661 4.81717 8.99905 4.84932 8.8374C4.88148 8.67575 4.96084 8.52727 5.07739 8.41072C5.19393 8.29418 5.34242 8.21481 5.50407 8.18266C5.66572 8.1505 5.83327 8.167 5.98555 8.23008C6.13782 8.29315 6.26797 8.39996 6.35953 8.537C6.4511 8.67404 6.49998 8.83516 6.49998 8.99998C6.49998 9.22099 6.41218 9.43295 6.2559 9.58923C6.09962 9.74551 5.88766 9.83331 5.66664 9.83331ZM8.99998 9.83331C8.83516 9.83331 8.67404 9.78444 8.537 9.69287C8.39996 9.6013 8.29315 9.47115 8.23008 9.31888C8.167 9.16661 8.1505 8.99905 8.18265 8.8374C8.21481 8.67575 8.29418 8.52727 8.41072 8.41072C8.52726 8.29418 8.67575 8.21481 8.8374 8.18266C8.99905 8.1505 9.16661 8.167 9.31888 8.23008C9.47115 8.29315 9.6013 8.39996 9.69287 8.537C9.78443 8.67404 9.83331 8.83516 9.83331 8.99998C9.83331 9.22099 9.74551 9.43295 9.58923 9.58923C9.43295 9.74551 9.22099 9.83331 8.99998 9.83331ZM12.3333 9.83331C12.1685 9.83331 12.0074 9.78444 11.8703 9.69287C11.7333 9.6013 11.6265 9.47115 11.5634 9.31888C11.5003 9.16661 11.4838 8.99905 11.516 8.8374C11.5481 8.67575 11.6275 8.52727 11.7441 8.41072C11.8606 8.29418 12.0091 8.21481 12.1707 8.18266C12.3324 8.1505 12.4999 8.167 12.6522 8.23008C12.8045 8.29315 12.9346 8.39996 13.0262 8.537C13.1178 8.67404 13.1666 8.83516 13.1666 8.99998C13.1666 9.22099 13.0788 9.43295 12.9226 9.58923C12.7663 9.74551 12.5543 9.83331 12.3333 9.83331Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='notice' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 211 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M29.3342 37.4456H138.838" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 69.8912H133.16" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 102.337H98.7261" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 134.783H78.8418" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 167.228H70.4834" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M103.839 157.965L126.812 149.988L190.04 86.7592L163.864 60.5833L100.636 123.812L92.6304 146.812L103.839 157.965Z" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M174.383 50.0642L180.692 43.7559L206.868 69.9318L200.25 76.5499" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M102.164 122.284L128.339 148.46" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M92.6469 146.758L87.0378 163.586L103.902 157.939" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M146.871 79.1473L172.025 104.3" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M163.172 136.214V199.674H5V5H163.172V39.2946" stroke="black" strokeWidth="8.19496" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>


                <div className="admin-content">
                    <ShowPanel />
                </div>
            </section>
        </>
    )
}