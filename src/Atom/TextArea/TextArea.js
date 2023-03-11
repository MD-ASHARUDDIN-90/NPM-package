import React from 'react'
export default function TextArea({onChange , placeholder , value , rows , cols}){
  return (
    <>
    <textarea onChange={onChange} placeholder={placeholder} value={value} rows={rows} cols={cols}/>
    </>
  )
}