import React from 'react'
export default function Input({onChange , placeholder , value , type , name , id}){
  return (
    <>
    <input name={name} id={id} type={type} onChange={onChange} placeholder={placeholder} value={value}/>
    </>
  )
}