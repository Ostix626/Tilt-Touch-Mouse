export const SET_IP_ADDRESS = "SET_IP_ADDRESS";


export const setIpAddress = (ip) => 
{
    return{ type: SET_IP_ADDRESS, ip: ip };
};

