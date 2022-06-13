import React from 'react'
import loadingGif from './loading.gif'
export default function Loading() {
  return (
    <div style={{background:'white',zIndex:1000,top:0,height:'100vh',width:'100vw',position:'fixed',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <img src={loadingGif} alt='loading gif'/>
    </div>
  )
}
