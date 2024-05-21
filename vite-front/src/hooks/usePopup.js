import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';
import { useState } from 'react';

const usePopup = () => {
    const [popupView, setPopupView] = useState(false);
    const [message, setMessage] = useState(null);

    // console.log('popVIew', popupView);

    const showPopup = message => {
        setPopupView(true);
        setMessage(message);
    };
    const hidePopup = () => {
        setPopupView(false);
        setMessage('');
    };

    const PopupComponent = ({ event }) => (
        <>
            {/* {console.log(id)} */}
            {popupView && (
                <Popup closePopup={() => hidePopup()}>
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
