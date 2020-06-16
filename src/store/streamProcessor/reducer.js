import {CONSTANTS} from "../constants";

const initialState = {
    addedSteps: [],
    stepTypes: [],

};

export default function StreamProcessorReducer(state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.STREAMS.ADD_NEW_STEP:
            const step = [...state.addedSteps, {'name': `${action.data}_${state.addedSteps.length}`}];
            return {...state, addedSteps: step};
        case CONSTANTS.STREAMS.GET_STEP_TYPE:
            return {...state, stepTypes: action.data};
        case CONSTANTS.STREAMS.DELL_NEW_STEP:
            let array = state.addedSteps.filter((n) => n.name !== action.data);
            return {...state, addedSteps: array};
        default:
            return state;
    }
}
