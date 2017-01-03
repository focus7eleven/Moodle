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
      console.log("--->:",res)
      // let publicKey = security.RSAUtils.getKeyPair(res.exponent,'',res.modulus)
      // let encryptedPassword = security.RSAUtils.encryptedString(publicKey,password)
      // fetch(config.api.user.login.post,{
      //   method:'POST',
      //   headers:{
      //     'from':'NODEJS',
      //     'Content-Type': 'application/json'
      //   },
      //   body:JSON.stringify({
      //     username:user,
      //     password:password
      //   })
      // }).then(res => res.json()).then(res => {
      //   console.log("--->:",res)
      // })
    })
  }
}
