import axios from "axios";
import {API_SERVER_HOST} from "./todoApi";


const rest_api_key = '15adf8a2e36ab44ebb1918d8e0483a09';
const redirect_url = 'http://localhost:3000/member/kakao';

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = 'https://kauth.kakao.com/oauth/token';

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`;
    return kakaoURL;
}

export const getAccessToken = async (authCode) => {
    const header = {headers: {"Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"}};

    const params = {
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_url,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header);
    const accessToken = res.data.access_token;
    return accessToken;
}

export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`);
    return res.data;
}