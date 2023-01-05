import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

//Line import
import axios from 'axios'
import qs from 'qs'
import jwtDecode from 'jwt-decode'

//hook import
import useBackend from "./hooks/useBackend";
import { useNavigate } from "react-router-dom";
import { useWebsite } from "./hooks/WebsiteContext";


const UseLogin = async () => {
    const {loginLine} = useBackend();

    let info = useLocation();

        console.log(info)
        const value = qs.parse(info.search, { ignoreQueryPrefix: true });

        let options = qs.stringify({ // POST的參數  用Qs是要轉成form-urlencoded 因為LINE不吃JSON格式
            grant_type: 'authorization_code',
            code: value.code,
            redirect_uri: 'http://localhost:3001/forlogin',
            client_id: '1657771320',
            client_secret: '87e9ecd48401b88aa9feab300724ea3a'
        })
        console.log(options);

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

        console.log("feedback: ", feedback);
    
    // console.log(info)
    // const value = qs.parse(info.search, { ignoreQueryPrefix: true });

    // let options = qs.stringify({ // POST的參數  用Qs是要轉成form-urlencoded 因為LINE不吃JSON格式
    //     grant_type: 'authorization_code',
    //     code: value.code,
    //     redirect_uri: 'http://localhost:3001/forlogin',
    //     client_id: '1657771320',
    //     client_secret: '87e9ecd48401b88aa9feab300724ea3a'
    //   })
    // console.log(options);
    // },[])
 
    // loginLine(options);

    // console.log("options: ", options);

    // await axios.post('https://api.line.me/oauth2/v2.1/token', options, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
    //     console.log("res: ", res);
    //     if(res){
    //         result = res.data.id_token;
    //         console.log("result: ", result)
    //         const decode = jwtDecode(result);
    //         console.log("decode: ", decode);
    //         const sub = decode.sub;
    //         const name = decode.name;
    //         GetUserData(sub);
    //         const ifM=checkManager(name, sub);
    //         getTBill(sub);
    //         setIflog(true);
            
    //     }
    //   })

    return(
        <div>home</div>
    )
}
export default UseLogin;