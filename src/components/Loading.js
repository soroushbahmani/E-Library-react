import React from 'react'
import loadingGif from './loading.gif'
export default function Loading() {
  var height = Math.max(window.innerHeight);

  return (
    <div style={{background:'white',zIndex:1000,top:0,height:height,width:'100vw',position:'fixed',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <img src={loadingGif} alt='loading gif'/>
    </div>
  )
}
