import { useLocation } from "react-router-dom"

//Line import
import axios from 'axios'
import qs from 'qs'

//hook import


const UseLogin = async () => {

    let info = useLocation();

        const value = qs.parse(info.search, { ignoreQueryPrefix: true });

        let options = qs.stringify({ // POST的參數  用Qs是要轉成form-urlencoded 因為LINE不吃JSON格式
            grant_type: 'authorization_code',
            code: value.code,
            redirect_uri: 'http://localhost:3001/forlogin',
            client_id: '1657771320',
            client_secret: '87e9ecd48401b88aa9feab300724ea3a'
        })

        const feedback = await axios({
            method: 'post',
            url: 'https://api.line.me/oauth2/v2.1/token',
            data: {
                grant_type: 'authorization_code',
                code: value.code,
                redirect_uri: 'http://localhost:3001/forlogin',
                client_id: '1657771320',
                client_secret: '87e9ecd48401b88aa9feab300724ea3a'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);

    return(
        <div>home</div>
    )
}
export default UseLogin;