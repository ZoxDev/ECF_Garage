import { useState, useEffect } from "react";
import { useFetchDelete } from "../../../hooks/querydelete";
import { useFetch } from "../../../hooks/queryget";
import styled from "styled-components"
import Loading from "../../../components/loading";

const OpenModal = styled.div`
 display : ${props => props.showmodal ? 'flex' : 'none'};
 `

export default function Notice() {
    // Notice (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
    // Use states
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState("");
    const [notice, setNotice] = useState([]);

    // Delete fetch
    const { callback: deleteData } = useFetchDelete("/noticemessage/" + id)

    // Get fetch
    let [data, loading, error] = useFetch("/noticemessage")
    useEffect(() => {
        setNotice(data)
    }, [data])

    // Delete
    const clickDelete = async () => {
        setNotice(notice.filter((notice) => notice.noticeid !== id))
        await deleteData();
    }

    // btn
    const closeDelete = () => {
        setIsOpen(!isOpen);
    }

    // Get
    if (loading) {
        <Loading></Loading>
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Instance each rows of the table (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
    const rows = notice.map((user) => (
        <tr key={user.noticeid}>
            <td>{user.noticeuserlastname}</td>
            <td>{user.noticeusername}</td>
            <td>{user.noticeusermessage}</td>
            <td>{user.noticeusernote}</td>
            <td>
                <button onClick={() => {
                    setIsOpen(!isOpen);
                    setId(user.noticeid);
                }}>
                    <svg width="27" height="30" viewBox="0 0 191 212" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M74.5481 169.083C77.3468 169.083 80.031 167.971 82.01 165.992C83.989 164.013 85.1009 161.329 85.1009 158.53V95.2135C85.1009 92.4147 83.989 89.7306 82.01 87.7515C80.031 85.7725 77.3468 84.6607 74.5481 84.6607C71.7493 84.6607 69.0651 85.7725 67.0861 87.7515C65.1071 89.7306 63.9953 92.4147 63.9953 95.2135V158.53C63.9953 161.329 65.1071 164.013 67.0861 165.992C69.0651 167.971 71.7493 169.083 74.5481 169.083ZM180.076 42.4495H137.865V31.8967C137.865 23.5003 134.529 15.4479 128.592 9.51081C122.655 3.57371 114.603 0.238281 106.206 0.238281H85.1009C76.7045 0.238281 68.6521 3.57371 62.715 9.51081C56.7779 15.4479 53.4425 23.5003 53.4425 31.8967V42.4495H11.2313C8.43249 42.4495 5.74834 43.5613 3.76931 45.5403C1.79028 47.5194 0.678467 50.2035 0.678467 53.0023C0.678467 55.8011 1.79028 58.4852 3.76931 60.4642C5.74834 62.4433 8.43249 63.5551 11.2313 63.5551H21.7841V179.636C21.7841 188.032 25.1195 196.085 31.0566 202.022C36.9937 207.959 45.0461 211.294 53.4425 211.294H137.865C146.261 211.294 154.314 207.959 160.251 202.022C166.188 196.085 169.523 188.032 169.523 179.636V63.5551H180.076C182.875 63.5551 185.559 62.4433 187.538 60.4642C189.517 58.4852 190.629 55.8011 190.629 53.0023C190.629 50.2035 189.517 47.5194 187.538 45.5403C185.559 43.5613 182.875 42.4495 180.076 42.4495ZM74.5481 31.8967C74.5481 29.0979 75.6599 26.4138 77.6389 24.4347C79.6179 22.4557 82.3021 21.3439 85.1009 21.3439H106.206C109.005 21.3439 111.689 22.4557 113.668 24.4347C115.647 26.4138 116.759 29.0979 116.759 31.8967V42.4495H74.5481V31.8967ZM148.418 179.636C148.418 182.435 147.306 185.119 145.327 187.098C143.348 189.077 140.664 190.189 137.865 190.189H53.4425C50.6437 190.189 47.9595 189.077 45.9805 187.098C44.0015 185.119 42.8897 182.435 42.8897 179.636V63.5551H148.418V179.636ZM116.759 169.083C119.558 169.083 122.242 167.971 124.221 165.992C126.2 164.013 127.312 161.329 127.312 158.53V95.2135C127.312 92.4147 126.2 89.7306 124.221 87.7515C122.242 85.7725 119.558 84.6607 116.759 84.6607C113.96 84.6607 111.276 85.7725 109.297 87.7515C107.318 89.7306 106.206 92.4147 106.206 95.2135V158.53C106.206 161.329 107.318 164.013 109.297 165.992C111.276 167.971 113.96 169.083 116.759 169.083Z" fill="#FF0000" />
                    </svg>
                </button>
            </td>
        </tr>
    ));

    // Notice return
    return (
        <>
            <h1 className='section-title'>Les avis !</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Message</th>
                        <th>Note</th>
                        <th>Supprimer</th>
                        <OpenModal showmodal={isOpen}>
                            <h1>Vraiment supprimer ?</h1>
                            <button onClick={() => {
                                clickDelete();
                                setIsOpen(!isOpen);
                            }}>
                                Oui
                            </button>
                            <button onClick={closeDelete}>Non</button>
                        </OpenModal>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    )
}
