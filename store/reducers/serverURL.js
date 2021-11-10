import { SET_IP_ADDRESS } from "../actions/serverURL";

const initalState = {
    baseUrl: "http://",
    ip: "192.168.",
};

const serverUrlReducer = (state = initalState, action) => {
    switch (action.type)
    {
        case SET_IP_ADDRESS:
            const url = "http://" + action.ip.toString() + ":3001";
            return {...state, baseUrl: url, ip: action.ip.toString()};
        default:
            return state;
    }
}

export default serverUrlReducer;