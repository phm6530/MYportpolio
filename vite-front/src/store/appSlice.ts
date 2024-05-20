import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

// User 인터페이스 정의
interface User {
    id: string | null;
    access: string | null;
    name: string | null;
}

const initialUserData: User = { id: null, access: null, name: null };

// AuthState 인터페이스 정의
interface AuthState {
    login: boolean;
    loading: boolean | null;
    user: User;
}

const initialAuthState: AuthState = {
    login: Boolean(localStorage.getItem('token')),
    loading: null,
    user: initialUserData,
};

// 로그인 상태 Slice 생성
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.login = true;
        },
        logOut(state) {
            state.login = false;
            state.user = initialUserData;
        },
        setLoading(state) {
            state.loading = true;
        },
        complete(state) {
            state.loading = false;
        },
        setUserData(state, action: PayloadAction<User>) {
            state.user.id = action.payload.id;
            state.user.access = action.payload.access;
            state.user.name = action.payload.name;
        },
    },
});

// Timer ID 타입 정의
type TimerId = number | null;

// Alert 인터페이스 정의
interface Alert {
    message: string;
    view: boolean;
    type: string | null;
    TimerId: TimerId;
}

const initialAlertState: Alert = {
    message: '',
    view: false,
    type: null,
    TimerId: null,
};

// Alert Slice 생성
const alertSlice = createSlice({
    name: 'alert',
    initialState: initialAlertState,
    reducers: {
        alertViewOn(
            state,
            action: PayloadAction<Pick<Alert, 'message' | 'type'>>,
        ) {
            state.view = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        alertViewOff(state) {
            state.view = false;
            state.TimerId = null;
        },
        setAlertTimerId(state, action: PayloadAction<TimerId>) {
            state.TimerId = action.payload;
        },
    },
});

// Modal State 인터페이스 정의
interface ModalState {
    view: boolean;
}

const initialModalState: ModalState = {
    view: false,
};

// Modal Slice 생성
const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        modalOpen(state) {
            state.view = true;
        },
        modalClose(state) {
            state.view = false;
        },
    },
});

// DarkMode 인터페이스 정의
interface DarkModeState {
    darkMode: boolean;
}

const initialDarkModeState: DarkModeState = {
    darkMode: localStorage.getItem('darkMode') === 'true',
};

// DarkMode Slice 생성
const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: initialDarkModeState,
    reducers: {
        toggleMode(state) {
            state.darkMode = !state.darkMode;
        },
    },
});

export type RootState = ReturnType<typeof store.getState>;

// 스토어
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        alert: alertSlice.reducer,
        modal: modalSlice.reducer,
        darkMode: darkModeSlice.reducer,
    },
});

export const authActions = authSlice.actions;
export const alertActions = alertSlice.actions;
export const modalActions = modalSlice.actions;
export const darkModeActions = darkModeSlice.actions;
export default store;
