import {actionNames} from "action-utils";
import config from "../config";
import _ from "underscore";
import security from '../utils/security'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const login = (user,password)=>{

  return dispatch => {
    return fetch(config.api.key.get,{
      headers:{
        'from':'nodejs'
      },
      method:'get'
    }).then(res => res.json()).then( res => {
      let publicKey = security.RSAUtils.getKeyPair(res.exponent,'',res.modulus)
      let encryptedPassword = security.RSAUtils.encryptedString(publicKey,password)
      let formData = new FormData()
      formData.append('username',user)
      formData.append('password',encryptedPassword)
      fetch(config.api.user.login.post,{
        method:'POST',
        headers:{
          'from':'NODEJS',
        },
        body: formData
      }).then(res => res.json()).then(res => {
        sessionStorage.setItem('accessToken',res.resultData.accessToken)
        dispatch({
          type:LOGIN_SUCCESS,
          payload:{
            accessToken:res.resultData.accessToken,
            expiresIn:res.resultData.expiresIn
          }
        })
      })
    })
  }
}
