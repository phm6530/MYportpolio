import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';
import { useState } from 'react';

const usePopup = () => {
    const [popupView, setPopupView] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const showPopup = (message: string) => {
        setPopupView(true);
        setMessage(message);
    };
    const hidePopup = () => {
        setPopupView(false);
        setMessage('');
    };

    const PopupComponent = ({ event }: { event: () => void }) => (
        <>
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
