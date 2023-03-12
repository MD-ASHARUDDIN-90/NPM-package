import React from 'react'

export default function Button({onClick , text , disabled , className}){
  return(
    <>
<button className={className} disabled={disabled} onClick={onClick}>{text}</button>
    </>
  )
}