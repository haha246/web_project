import { getToken, parseJwt } from '../utils/token'

export const initialState = {
  user: getToken() ? parseJwt(getToken()).user : null,
  token: '' || getToken(),
  loading: false,
  errorMessage: null,
  recipes: [],
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...initialState,
        user: null,
        token: null,
      }

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    case 'SET_RECIPES':
      return {
        ...initialState,
        recipes: action.payload.recipes,
      }

    case 'DELETE_RECIPE':
      const id = action.payload.deleteId
      const newRecipes = initialState.recipes.filter((r) => r._id !== id)

      return {
        ...initialState,
        recipes: newRecipes,
      }

    default:
      return initialState
  }
}
