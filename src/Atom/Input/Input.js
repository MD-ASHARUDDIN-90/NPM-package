import React from 'react'
export default function Input({onChange , placeholder , value , type , name , id ,className}){
  return (
    <>
    <input className={className} name={name} id={id} type={type} onChange={onChange} placeholder={placeholder} value={value}/>
    </>
  )
}