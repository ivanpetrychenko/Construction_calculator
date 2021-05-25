import {useState, useCallback, useEffect} from 'react'
import {userAuth} from '../actions/index';
import { useDispatch } from 'react-redux';

const storageName = 'loginData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch();

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken
    }));
    dispatch(userAuth(true));
  }, [dispatch])


  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(storageName);
    dispatch(userAuth(false));
  }, [dispatch])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    console.log(data)
    if (data && data.token) {
      login(data.token)
    }
    setReady(true)
    dispatch(userAuth(!!data));
  }, [login, dispatch])


  return { login, logout, token, ready }
}