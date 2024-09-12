import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginPostAsync, logout} from "../slices/loginSlice";



// 로그인 관련 커스텀 훅
function useCustomLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginState = useSelector(state => state.loginSlice);

    const isLogin = loginState.email ? true : false;

    // 로그인 할 때
    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam));
        return action.payload;
    }

    // 로그아웃 할 때
    const doLogout = () => {
        dispatch(logout());
    }

    // 단순 페이지 이동
    const moveToPath = (path) => {
        navigate({pathname: path}, {replace: true});
    }

    // 로그인 페이지로 이동
    const moveToLogin = () => {
        navigate({pathname: '/member/login'}, {replace: true});
    }

    // 로그인 페이지로 이동하는 컴포넌트
    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login"/>
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn};

}

export default useCustomLogin;