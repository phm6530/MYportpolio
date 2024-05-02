import { createSlice, configureStore } from '@reduxjs/toolkit';

const initalUserData = { id: null, name: null, access: null };

// 로그인 상태 Slice 생성
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: Boolean(localStorage.getItem('token')),
        loading: null,
        user: {
            id: null,
            name: null,
            access: null,
        },
    },
    reducers: {
        login(state) {
            state.login = true;
        },
        logOut(state) {
            state.login = false;
            state.user = initalUserData;
        },
        loading(state) {
            state.loading = true;
        },
        complete(state) {
            state.loading = false;
        },
        userData(state, action) {
            state.user.id = action.payload.id;
            state.user.access = action.payload.role;
            state.user.name = action.payload.name;
        },
    },
});

// Alert Slice 생성
const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: '',
        view: false,
        type: null,
        TimerId: null,
    },
    reducers: {
        alertViewOn(state, action) {
            state.view = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        alertViewOff(state) {
            state.view = false;
            state.TimerId = null;
        },
        alertTimerId(state, action) {
            state.TimerId = action.payload.setTimerId;
        },
    },
});

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        view: false,
    },
    reducers: {
        modalOpen(state) {
            state.view = true;
        },
        modalClose(state) {
            state.view = false;
        },
    },
});

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
    },
    reducers: {
        toggleMode(state) {
            state.darkMode = !state.darkMode;
        },
    },
});

const store = configureStore({
    reducer: {
        alertSlice: alertSlice.reducer,
        authSlice: authSlice.reducer,
        modalSlice: modalSlice.reducer,
        darkModeSlice: darkModeSlice.reducer,
    },
});

export const authAction = authSlice.actions;
export const alertAction = alertSlice.actions;
export const modalAction = modalSlice.actions;
export const darkModeAction = darkModeSlice.actions;
export default store;
