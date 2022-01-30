import { apiUserLogin, apiUserLogout, apiUserSignup } from '../axios/auth'
import useRecipe from './useRecipe'
import { setToken, removeToken, parseJwt } from '../utils/token'

const useAuth = (dispatch) => {
  const { showPrivateRecipes } = useRecipe()

  const userLogin = async (email, password) => {
    const data = await apiUserLogin(email, password)
    if (data.isValid === true) {
      setToken(data.token)
      const userInfo = parseJwt(data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo })
    }

    return data
  }

  const userLogout = async () => {
    const data = await apiUserLogout()
    removeToken()
    dispatch({ type: 'LOGOUT' })
    return data
  }

  const userSignup = async (nickname, email, password) => {
    const data = await apiUserSignup(nickname, email, password)
    if (data.isValid === true) {
      setToken(data.token)
      const userInfo = parseJwt(data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo })
    }
    showPrivateRecipes(email)
    return data
  }

  return {
    userLogin,
    userLogout,
    userSignup,
  }
}

export default useAuth
