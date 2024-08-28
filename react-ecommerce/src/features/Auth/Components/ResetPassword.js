import React from 'react';
import{useDispatch, useSelector} from "react-redux"
import {useForm} from "react-hook-form"
import {

  resetPasswordAsync,
  selectResetPassword,
  selectError
  
 } from '../AuthSlice';

import { Link, Navigate } from 'react-router-dom';
export  default function ResetPassword() {
  const{register,handleSubmit,formState:{errors}}=useForm();
const dispatch=useDispatch()
  const resetPassword =useSelector(selectResetPassword)
 const query=new URLSearchParams(window.location.search);
 const token=query.get('token')
 const email=query.get("email")
  console.log(email,token)
  
 const error=useSelector(selectError)

  return (
  <>
  
  {(email && token)? <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
           src="/logo_transparent.png"
            className="mx-auto h-40 w-auto"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter New Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate onSubmit={handleSubmit((data)=>{
          console.log(data)
          dispatch(resetPasswordAsync({email,token,password:data.password}))
          //ToDo implementation on backent with email
          })} 
           className="space-y-6">
             <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password",{
                    required:true,
                    pattern:{
                    value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message:`- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    - Can contain special characters`
                    }})}
                  type="password"
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
               {errors.password && <p className='text-red-500'>{errors.password.message}</p>} 
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm New Password
                </label>
            
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                 {...register("confirmpassword",{required:"confirm password is required",
                  validate:(value,formValues)=>value===formValues.password || "password not matching"               
                 })}
                  type="password"
             
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmpassword && <p className='text-red-500'>{errors.confirmpassword.message}</p>} 
                {resetPassword && <p className='text-green-500'>Password Reset</p>} 
                {error && <p className='text-red-500'>{error}</p>} 
              </div>
             
            </div>

            
             

            <div>
              <button
                type="submit"
               className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Reset Password
              </button>
            </div>
          </form>

         
        </div>
      </div>:<p>Incorrect Link Or Link was Expired</p>}
  </>
  );
}
