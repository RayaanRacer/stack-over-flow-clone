import React from 'react'

function Avatar({children,backgroundColor,borderRadius,py,px,color,fontSize,cursor}) {
  const style = {
    backgroundColor,
    borderRadius,
    padding: `${py} ${px}`,
    color : color || 'black',
    textAlign :'center',
    fontSize,
    cursor : cursor || null,
    
  }
  return (
    <div style={style}>{children}</div>
  )
}

export default Avatar