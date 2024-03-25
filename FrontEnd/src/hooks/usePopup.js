import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';
import { useState } from 'react';

const usePopup = () => {
    const [popView, setPopupView] = useState({});
    const [ID, setID] = useState(null);
    const [message, setMessage] = useState(null);
    // console.log('PopView ::: ', popView);
    // console.log('id ::', ID);
    const showPopup = id => {
        setID(id);
        setPopupView(prev => ({ ...prev, [id]: true }));
    };
    const hidePopup = id => {
        setPopupView(prev => ({ ...prev, [id]: false }));
    };

    const PopupComponent = ({ id, event }) => (
        <>
            {/* {console.log(id)} */}
            {popView[id] && (
                <Popup closePopup={() => hidePopup(id)}>
                    <Confirm message={message} confirm={event} />
                </Popup>
            )}
        </>
    );

    return {
        showPopup,
        setMessage,
        hidePopup,
        PopupComponent,
    };
};

export default usePopup;
