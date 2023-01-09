import axios from "axios";
import jwtDecode from "jwt-decode";
import { AddUser } from "./AddFunc";
import { GetUserData } from "./GetFunc";

const loginLine = async (input, ws) => {
    const feedback = await axios({
        method: 'post',
        url: 'https://api.line.me/oauth2/v2.1/token',
        data: {
            grant_type: 'authorization_code',
            code: input,
            redirect_uri: 'https://test-production-fc86.up.railway.app/login',
            client_id: '1657771320',
            client_secret: '87e9ecd48401b88aa9feab300724ea3a'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.data);

    let data = jwtDecode(feedback.id_token);
    const iflog = await GetUserData(data.sub, ws);
    if(!iflog){
        AddUser({name: data.name, lineId: data.sub}, ws);
        GetUserData(data.sub, ws)
    };

}

export { loginLine };


