import React from 'react'

export default function Button({onClick , text , disabled}){
  return(
    <>
<button disabled={disabled} onClick={onClick}>{text}</button>
    </>
  )
}