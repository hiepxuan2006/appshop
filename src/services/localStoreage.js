import { getLocalData, setLocalData } from "./StoreageServices"

const _store = {
  state: {
    accessToken: getLocalData("access_token", ""),
    refreshToken: getLocalData("refreshToken", ""),
    user: getLocalData("user", {}),
  },
}

export const setAccessToken = (accessToken) => {
  _store.state = {
    ..._store.state,
    accessToken,
  }

  setLocalData("access_token", accessToken)
}

export const setRoles = (roles) => {
  _store.state = {
    ..._store.state,
    roles,
  }

  setLocalData("roles", roles)
}

export const setUserData = (user) => {
  const updatedUser = user

  _store.state = {
    ..._store.state,
    user: updatedUser,
  }

  setLocalData("user", updatedUser)
}
export const getAccessToken = () =>
  getLocalData("access_token") || _store.state.accessToken || ""

export const getRoles = () => getLocalData("roles") || _store.state.roles || ""

export const getUserData = () => getLocalData("user") || _store.state.user || {}
