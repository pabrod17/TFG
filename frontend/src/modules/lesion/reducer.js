import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    lesion: null,
    lesions:null
};

const lesion = (state = initialState.lesion, action) => {

    switch(action.type) {
        case actionTypes.ADD_LESION_COMPLETED:
            return action.lesion;
        case actionTypes.ADD_LESION_TO_PLAYER_COMPLETED:
            return state;
        case actionTypes.UPDATE_LESION_COMPLETED:
            return action.lesion;
        case actionTypes.REMOVE_LESION_COMPLETED:
            return state;
        case actionTypes.REMOVE_LESION_TO_PLAYER_COMPLETED:
            return state;
        case actionTypes.FIND_LESION_BY_ID_COMPLETED:
            return action.lesion;
        default:
            return state;
    }
}

const lesions = (state = initialState.lesions, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_ALL_LESION_COMPLETED:
            return action.lesions;
        case actionTypes.FIND_LESION_BY_PLAYER_COMPLETED:
            return action.lesions;
        case actionTypes.FIND_LESION_BY_TYPE_COMPLETED:
            return action.lesions;
        default:
            return state;
    }
}

const reducer = combineReducers({
    lesion,
    lesions
});

export default reducer;