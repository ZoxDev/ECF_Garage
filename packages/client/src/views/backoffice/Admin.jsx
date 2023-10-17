// Css
import './admin.css'

// Components
import DashNav from './component/DashNav/DashNav';
import Notice from './component/Notice/Notice'
import Info from './component/Info/Info';
import Schedule from './component/Schedule/Schedule';
import Employee from './component/Employee/EmployeeSection';
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
            case "info":
                return <Info />
            case "schedule":
                return <Schedule />
            case "employee":
                return <Employee />
            case "notice":
                return <Notice />
            default:
                return <Info />
        }
    }

    // THE PAGE
    return (
        <>
            <section className="admin-container">
                <Navbar />
                <DashNav/>
                <div className="admin-menu-mobile">
                    <button onClick={onClickButton} id='info' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 202 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M151.401 0C123.644 0 100.934 22.7101 100.934 50.4668C100.934 78.2236 123.644 100.934 151.401 100.934C179.157 100.934 201.867 78.2236 201.867 50.4668C201.867 22.7101 179.157 0 151.401 0ZM75.7003 126.167C33.8128 126.167 0 159.98 0 201.867H50.4668C50.4668 187.737 61.5695 176.634 75.7003 176.634C89.831 176.634 100.934 187.737 100.934 201.867C100.934 215.998 50.4668 284.633 50.4668 328.034C50.4668 371.436 84.2796 403.735 126.167 403.735C168.055 403.735 201.867 369.922 201.867 328.034H151.401C151.401 342.165 140.298 353.268 126.167 353.268C112.036 353.268 100.934 342.165 100.934 328.034C100.934 309.866 151.401 235.175 151.401 201.867C151.401 160.989 117.588 126.167 75.7003 126.167Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='schedule' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 202 223" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.934 181.681C102.93 181.681 104.881 181.089 106.541 179.98C108.201 178.871 109.495 177.294 110.259 175.45C111.023 173.606 111.223 171.576 110.833 169.618C110.444 167.66 109.482 165.862 108.071 164.45C106.659 163.039 104.861 162.077 102.903 161.688C100.945 161.298 98.9154 161.498 97.0711 162.262C95.2268 163.026 93.6504 164.32 92.5414 165.98C91.4323 167.64 90.8403 169.591 90.8403 171.587C90.8403 174.264 91.9037 176.831 93.7966 178.724C95.6895 180.617 98.2568 181.681 100.934 181.681ZM151.401 181.681C153.397 181.681 155.348 181.089 157.008 179.98C158.668 178.871 159.962 177.294 160.726 175.45C161.49 173.606 161.689 171.576 161.3 169.618C160.911 167.66 159.949 165.862 158.538 164.45C157.126 163.039 155.328 162.077 153.37 161.688C151.412 161.298 149.382 161.498 147.538 162.262C145.694 163.026 144.117 164.32 143.008 165.98C141.899 167.64 141.307 169.591 141.307 171.587C141.307 174.264 142.371 176.831 144.263 178.724C146.156 180.617 148.724 181.681 151.401 181.681ZM151.401 141.307C153.397 141.307 155.348 140.715 157.008 139.606C158.668 138.497 159.962 136.921 160.726 135.076C161.49 133.232 161.689 131.203 161.3 129.245C160.911 127.287 159.949 125.488 158.538 124.077C157.126 122.665 155.328 121.704 153.37 121.314C151.412 120.925 149.382 121.125 147.538 121.889C145.694 122.653 144.117 123.946 143.008 125.606C141.899 127.266 141.307 129.218 141.307 131.214C141.307 133.891 142.371 136.458 144.263 138.351C146.156 140.244 148.724 141.307 151.401 141.307ZM100.934 141.307C102.93 141.307 104.881 140.715 106.541 139.606C108.201 138.497 109.495 136.921 110.259 135.076C111.023 133.232 111.223 131.203 110.833 129.245C110.444 127.287 109.482 125.488 108.071 124.077C106.659 122.665 104.861 121.704 102.903 121.314C100.945 120.925 98.9154 121.125 97.0711 121.889C95.2268 122.653 93.6504 123.946 92.5414 125.606C91.4323 127.266 90.8403 129.218 90.8403 131.214C90.8403 133.891 91.9037 136.458 93.7966 138.351C95.6895 140.244 98.2568 141.307 100.934 141.307ZM171.587 20.1867H161.494V10.0934C161.494 7.41644 160.43 4.84915 158.538 2.95628C156.645 1.0634 154.077 0 151.401 0C148.724 0 146.156 1.0634 144.263 2.95628C142.371 4.84915 141.307 7.41644 141.307 10.0934V20.1867H60.5602V10.0934C60.5602 7.41644 59.4968 4.84915 57.6039 2.95628C55.7111 1.0634 53.1438 0 50.4668 0C47.7899 0 45.2226 1.0634 43.3298 2.95628C41.4369 4.84915 40.3735 7.41644 40.3735 10.0934V20.1867H30.2801C22.2493 20.1867 14.5475 23.377 8.86884 29.0556C3.19022 34.7342 0 42.4361 0 50.4668V191.774C0 199.805 3.19022 207.507 8.86884 213.185C14.5475 218.864 22.2493 222.054 30.2801 222.054H171.587C179.618 222.054 187.32 218.864 192.999 213.185C198.677 207.507 201.867 199.805 201.867 191.774V50.4668C201.867 42.4361 198.677 34.7342 192.999 29.0556C187.32 23.377 179.618 20.1867 171.587 20.1867ZM181.681 191.774C181.681 194.451 180.617 197.018 178.724 198.911C176.831 200.804 174.264 201.867 171.587 201.867H30.2801C27.6032 201.867 25.0359 200.804 23.143 198.911C21.2501 197.018 20.1867 194.451 20.1867 191.774V100.934H181.681V191.774ZM181.681 80.7469H20.1867V50.4668C20.1867 47.7899 21.2501 45.2226 23.143 43.3298C25.0359 41.4369 27.6032 40.3735 30.2801 40.3735H40.3735V50.4668C40.3735 53.1438 41.4369 55.7111 43.3298 57.6039C45.2226 59.4968 47.7899 60.5602 50.4668 60.5602C53.1438 60.5602 55.7111 59.4968 57.6039 57.6039C59.4968 55.7111 60.5602 53.1438 60.5602 50.4668V40.3735H141.307V50.4668C141.307 53.1438 142.371 55.7111 144.263 57.6039C146.156 59.4968 148.724 60.5602 151.401 60.5602C154.077 60.5602 156.645 59.4968 158.538 57.6039C160.43 55.7111 161.494 53.1438 161.494 50.4668V40.3735H171.587C174.264 40.3735 176.831 41.4369 178.724 43.3298C180.617 45.2226 181.681 47.7899 181.681 50.4668V80.7469ZM50.4668 141.307C52.4631 141.307 54.4146 140.715 56.0744 139.606C57.7343 138.497 59.028 136.921 59.7919 135.076C60.5558 133.232 60.7557 131.203 60.3663 129.245C59.9768 127.287 59.0155 125.488 57.6039 124.077C56.1923 122.665 54.3939 121.704 52.436 121.314C50.478 120.925 48.4486 121.125 46.6043 121.889C44.76 122.653 43.1836 123.946 42.0745 125.606C40.9654 127.266 40.3735 129.218 40.3735 131.214C40.3735 133.891 41.4369 136.458 43.3298 138.351C45.2226 140.244 47.7899 141.307 50.4668 141.307ZM50.4668 181.681C52.4631 181.681 54.4146 181.089 56.0744 179.98C57.7343 178.871 59.028 177.294 59.7919 175.45C60.5558 173.606 60.7557 171.576 60.3663 169.618C59.9768 167.66 59.0155 165.862 57.6039 164.45C56.1923 163.039 54.3939 162.077 52.436 161.688C50.478 161.298 48.4486 161.498 46.6043 162.262C44.76 163.026 43.1836 164.32 42.0745 165.98C40.9654 167.64 40.3735 169.591 40.3735 171.587C40.3735 174.264 41.4369 176.831 43.3298 178.724C45.2226 180.617 47.7899 181.681 50.4668 181.681Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='employee' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75.7002 92.5225C82.3545 92.5225 88.8593 90.5493 94.3921 86.8524C99.925 83.1555 104.237 77.9009 106.784 71.7532C109.33 65.6055 109.997 58.8407 108.698 52.3142C107.4 45.7878 104.196 39.793 99.4905 35.0877C94.7852 30.3824 88.7904 27.1781 82.264 25.8799C75.7375 24.5817 68.9728 25.248 62.825 27.7945C56.6773 30.3409 51.4227 34.6532 47.7258 40.1861C44.0289 45.7189 42.0557 52.2237 42.0557 58.878C42.0557 67.8011 45.6003 76.3587 51.9099 82.6683C58.2195 88.9779 66.7771 92.5225 75.7002 92.5225Z" fill="black" />
                            <path d="M142.989 109.345C147.98 109.345 152.859 107.865 157.008 105.092C161.158 102.319 164.392 98.3786 166.302 93.7678C168.212 89.157 168.712 84.0834 167.738 79.1886C166.764 74.2938 164.361 69.7976 160.832 66.2686C157.303 62.7397 152.807 60.3364 147.912 59.3628C143.017 58.3892 137.944 58.8889 133.333 60.7987C128.722 62.7086 124.781 65.9428 122.009 70.0924C119.236 74.242 117.756 79.1207 117.756 84.1114C117.756 90.8037 120.414 97.2219 125.147 101.954C129.879 106.686 136.297 109.345 142.989 109.345Z" fill="black" />
                            <path d="M176.634 168.223C178.865 168.223 181.004 167.337 182.582 165.76C184.159 164.182 185.045 162.043 185.045 159.812C185.038 151.951 182.828 144.249 178.666 137.58C174.504 130.912 168.556 125.543 161.497 122.084C154.438 118.624 146.551 117.213 138.73 118.009C130.909 118.805 123.468 121.777 117.251 126.588C109.013 118.382 98.5286 112.799 87.1211 110.543C75.7136 108.288 63.8937 109.46 53.1519 113.914C42.4101 118.367 33.2275 125.901 26.7621 135.566C20.2967 145.232 16.838 156.595 16.8223 168.223C16.8223 170.454 17.7084 172.593 19.2858 174.171C20.8632 175.748 23.0026 176.634 25.2334 176.634H126.167C128.398 176.634 130.537 175.748 132.115 174.171C133.692 172.593 134.578 170.454 134.578 168.223" fill="black" />
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
                <div className="admin-menu-desktop">
                    <button onClick={onClickButton} id='info' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 202 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M151.401 0C123.644 0 100.934 22.7101 100.934 50.4668C100.934 78.2236 123.644 100.934 151.401 100.934C179.157 100.934 201.867 78.2236 201.867 50.4668C201.867 22.7101 179.157 0 151.401 0ZM75.7003 126.167C33.8128 126.167 0 159.98 0 201.867H50.4668C50.4668 187.737 61.5695 176.634 75.7003 176.634C89.831 176.634 100.934 187.737 100.934 201.867C100.934 215.998 50.4668 284.633 50.4668 328.034C50.4668 371.436 84.2796 403.735 126.167 403.735C168.055 403.735 201.867 369.922 201.867 328.034H151.401C151.401 342.165 140.298 353.268 126.167 353.268C112.036 353.268 100.934 342.165 100.934 328.034C100.934 309.866 151.401 235.175 151.401 201.867C151.401 160.989 117.588 126.167 75.7003 126.167Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='schedule' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 202 223" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.934 181.681C102.93 181.681 104.881 181.089 106.541 179.98C108.201 178.871 109.495 177.294 110.259 175.45C111.023 173.606 111.223 171.576 110.833 169.618C110.444 167.66 109.482 165.862 108.071 164.45C106.659 163.039 104.861 162.077 102.903 161.688C100.945 161.298 98.9154 161.498 97.0711 162.262C95.2268 163.026 93.6504 164.32 92.5414 165.98C91.4323 167.64 90.8403 169.591 90.8403 171.587C90.8403 174.264 91.9037 176.831 93.7966 178.724C95.6895 180.617 98.2568 181.681 100.934 181.681ZM151.401 181.681C153.397 181.681 155.348 181.089 157.008 179.98C158.668 178.871 159.962 177.294 160.726 175.45C161.49 173.606 161.689 171.576 161.3 169.618C160.911 167.66 159.949 165.862 158.538 164.45C157.126 163.039 155.328 162.077 153.37 161.688C151.412 161.298 149.382 161.498 147.538 162.262C145.694 163.026 144.117 164.32 143.008 165.98C141.899 167.64 141.307 169.591 141.307 171.587C141.307 174.264 142.371 176.831 144.263 178.724C146.156 180.617 148.724 181.681 151.401 181.681ZM151.401 141.307C153.397 141.307 155.348 140.715 157.008 139.606C158.668 138.497 159.962 136.921 160.726 135.076C161.49 133.232 161.689 131.203 161.3 129.245C160.911 127.287 159.949 125.488 158.538 124.077C157.126 122.665 155.328 121.704 153.37 121.314C151.412 120.925 149.382 121.125 147.538 121.889C145.694 122.653 144.117 123.946 143.008 125.606C141.899 127.266 141.307 129.218 141.307 131.214C141.307 133.891 142.371 136.458 144.263 138.351C146.156 140.244 148.724 141.307 151.401 141.307ZM100.934 141.307C102.93 141.307 104.881 140.715 106.541 139.606C108.201 138.497 109.495 136.921 110.259 135.076C111.023 133.232 111.223 131.203 110.833 129.245C110.444 127.287 109.482 125.488 108.071 124.077C106.659 122.665 104.861 121.704 102.903 121.314C100.945 120.925 98.9154 121.125 97.0711 121.889C95.2268 122.653 93.6504 123.946 92.5414 125.606C91.4323 127.266 90.8403 129.218 90.8403 131.214C90.8403 133.891 91.9037 136.458 93.7966 138.351C95.6895 140.244 98.2568 141.307 100.934 141.307ZM171.587 20.1867H161.494V10.0934C161.494 7.41644 160.43 4.84915 158.538 2.95628C156.645 1.0634 154.077 0 151.401 0C148.724 0 146.156 1.0634 144.263 2.95628C142.371 4.84915 141.307 7.41644 141.307 10.0934V20.1867H60.5602V10.0934C60.5602 7.41644 59.4968 4.84915 57.6039 2.95628C55.7111 1.0634 53.1438 0 50.4668 0C47.7899 0 45.2226 1.0634 43.3298 2.95628C41.4369 4.84915 40.3735 7.41644 40.3735 10.0934V20.1867H30.2801C22.2493 20.1867 14.5475 23.377 8.86884 29.0556C3.19022 34.7342 0 42.4361 0 50.4668V191.774C0 199.805 3.19022 207.507 8.86884 213.185C14.5475 218.864 22.2493 222.054 30.2801 222.054H171.587C179.618 222.054 187.32 218.864 192.999 213.185C198.677 207.507 201.867 199.805 201.867 191.774V50.4668C201.867 42.4361 198.677 34.7342 192.999 29.0556C187.32 23.377 179.618 20.1867 171.587 20.1867ZM181.681 191.774C181.681 194.451 180.617 197.018 178.724 198.911C176.831 200.804 174.264 201.867 171.587 201.867H30.2801C27.6032 201.867 25.0359 200.804 23.143 198.911C21.2501 197.018 20.1867 194.451 20.1867 191.774V100.934H181.681V191.774ZM181.681 80.7469H20.1867V50.4668C20.1867 47.7899 21.2501 45.2226 23.143 43.3298C25.0359 41.4369 27.6032 40.3735 30.2801 40.3735H40.3735V50.4668C40.3735 53.1438 41.4369 55.7111 43.3298 57.6039C45.2226 59.4968 47.7899 60.5602 50.4668 60.5602C53.1438 60.5602 55.7111 59.4968 57.6039 57.6039C59.4968 55.7111 60.5602 53.1438 60.5602 50.4668V40.3735H141.307V50.4668C141.307 53.1438 142.371 55.7111 144.263 57.6039C146.156 59.4968 148.724 60.5602 151.401 60.5602C154.077 60.5602 156.645 59.4968 158.538 57.6039C160.43 55.7111 161.494 53.1438 161.494 50.4668V40.3735H171.587C174.264 40.3735 176.831 41.4369 178.724 43.3298C180.617 45.2226 181.681 47.7899 181.681 50.4668V80.7469ZM50.4668 141.307C52.4631 141.307 54.4146 140.715 56.0744 139.606C57.7343 138.497 59.028 136.921 59.7919 135.076C60.5558 133.232 60.7557 131.203 60.3663 129.245C59.9768 127.287 59.0155 125.488 57.6039 124.077C56.1923 122.665 54.3939 121.704 52.436 121.314C50.478 120.925 48.4486 121.125 46.6043 121.889C44.76 122.653 43.1836 123.946 42.0745 125.606C40.9654 127.266 40.3735 129.218 40.3735 131.214C40.3735 133.891 41.4369 136.458 43.3298 138.351C45.2226 140.244 47.7899 141.307 50.4668 141.307ZM50.4668 181.681C52.4631 181.681 54.4146 181.089 56.0744 179.98C57.7343 178.871 59.028 177.294 59.7919 175.45C60.5558 173.606 60.7557 171.576 60.3663 169.618C59.9768 167.66 59.0155 165.862 57.6039 164.45C56.1923 163.039 54.3939 162.077 52.436 161.688C50.478 161.298 48.4486 161.498 46.6043 162.262C44.76 163.026 43.1836 164.32 42.0745 165.98C40.9654 167.64 40.3735 169.591 40.3735 171.587C40.3735 174.264 41.4369 176.831 43.3298 178.724C45.2226 180.617 47.7899 181.681 50.4668 181.681Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='employee' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75.7002 92.5225C82.3545 92.5225 88.8593 90.5493 94.3921 86.8524C99.925 83.1555 104.237 77.9009 106.784 71.7532C109.33 65.6055 109.997 58.8407 108.698 52.3142C107.4 45.7878 104.196 39.793 99.4905 35.0877C94.7852 30.3824 88.7904 27.1781 82.264 25.8799C75.7375 24.5817 68.9728 25.248 62.825 27.7945C56.6773 30.3409 51.4227 34.6532 47.7258 40.1861C44.0289 45.7189 42.0557 52.2237 42.0557 58.878C42.0557 67.8011 45.6003 76.3587 51.9099 82.6683C58.2195 88.9779 66.7771 92.5225 75.7002 92.5225Z" fill="black" />
                            <path d="M142.989 109.345C147.98 109.345 152.859 107.865 157.008 105.092C161.158 102.319 164.392 98.3786 166.302 93.7678C168.212 89.157 168.712 84.0834 167.738 79.1886C166.764 74.2938 164.361 69.7976 160.832 66.2686C157.303 62.7397 152.807 60.3364 147.912 59.3628C143.017 58.3892 137.944 58.8889 133.333 60.7987C128.722 62.7086 124.781 65.9428 122.009 70.0924C119.236 74.242 117.756 79.1207 117.756 84.1114C117.756 90.8037 120.414 97.2219 125.147 101.954C129.879 106.686 136.297 109.345 142.989 109.345Z" fill="black" />
                            <path d="M176.634 168.223C178.865 168.223 181.004 167.337 182.582 165.76C184.159 164.182 185.045 162.043 185.045 159.812C185.038 151.951 182.828 144.249 178.666 137.58C174.504 130.912 168.556 125.543 161.497 122.084C154.438 118.624 146.551 117.213 138.73 118.009C130.909 118.805 123.468 121.777 117.251 126.588C109.013 118.382 98.5286 112.799 87.1211 110.543C75.7136 108.288 63.8937 109.46 53.1519 113.914C42.4101 118.367 33.2275 125.901 26.7621 135.566C20.2967 145.232 16.838 156.595 16.8223 168.223C16.8223 170.454 17.7084 172.593 19.2858 174.171C20.8632 175.748 23.0026 176.634 25.2334 176.634H126.167C128.398 176.634 130.537 175.748 132.115 174.171C133.692 172.593 134.578 170.454 134.578 168.223" fill="black" />
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