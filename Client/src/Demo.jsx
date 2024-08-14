import React,{memo} from 'react'

const Demo = ({a}) => {
    console.log("hello");
  return (
    <div>Hello</div>
  )
}

export default memo(Demo)