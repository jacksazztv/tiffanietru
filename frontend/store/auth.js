import Cookies from 'js-cookie';

export const state = () => {};

export const mutations = {
    setUser(state, user) {
        state.user = user;
        Cookies.set('user', user, {path: '/', expires: 30, sameSite: 'strict'});
    },
    logout(state) {
        state.user = null;
        Cookies.remove('user');
    }
};

export const getters = {
    username: state => {
        return state.user && state.user.username;
    },
}