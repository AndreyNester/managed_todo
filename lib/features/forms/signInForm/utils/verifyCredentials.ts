import { ISignInCredentials } from "../types"

export const verifyCredentials = async (values : ISignInCredentials) => await fetch('api/signIn', {
  method : 'POST',
  headers : {
    'Content-type': 'application/json',
  },
  body : JSON.stringify(values )
}).then((res)=>{
  if (res.status >=400) throw new Error(res.statusText)
    return res.json()
})