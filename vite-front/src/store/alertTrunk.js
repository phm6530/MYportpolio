import { alertActions } from 'store/appSlice';

const alertThunk = (message, type) => (dispatch, getState) => {
    const {
        alertSlice: { TimerId },
    } = getState();

    if (TimerId) {
        clearTimeout(TimerId);
        dispatch(alertActions.alertViewOff());
    }

    dispatch(alertActions.alertViewOn({ message, type }));
    const setTimerId = setTimeout(() => {
        dispatch(alertActions.alertViewOff());
    }, 3000);

    dispatch(alertActions.alertTimerId({ setTimerId }));
};

export default alertThunk;
