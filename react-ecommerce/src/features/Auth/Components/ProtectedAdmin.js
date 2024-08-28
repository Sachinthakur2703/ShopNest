import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/UserSlice'
const ProtectedAdmin = ({children}) => {
    const user=useSelector(selectLoggedInUser)
    const userInfo=useSelector(selectUserInfo)
    if(!user){
        return <Navigate to="/login" replace={true} />
        }
     if(user && userInfo.role!=="admin"){
            return <Navigate to="/" replace={true} />
            }
    
  return children;

    }
export default ProtectedAdmin
