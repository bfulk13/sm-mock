const initialState = {
    id: 0,
    username: '',
    password: '',
    img: ''
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case UPDATE_USER:
            const { id, username } = payload;
            const img = payload.profile_pic;
            // console.log('hit')            
            return { ...state, id, username, img };
        case CLEAR_USER:
            return { ...state, id: 0, username: '', password: '', img: '' }
        default:
            return state;
    }
}