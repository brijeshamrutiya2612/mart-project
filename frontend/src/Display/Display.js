import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import Home from '../components/Home'

const reducer = (state,action) =>{
    switch(action.type){
        case "PRODUCT_SUCCESS":
            return {...state, displayProduct:action.payload}
    }
}

const Display = (props) => {
    // const [{displayProduct},dispatch] = useReducer(reducer,{
    //     displayProduct:[]    
    // })
    // useEffect(()=>{
    //     const getProduct= async () => {

    //         try{
    //             const data = await axios.get("http://localhost:5000/api/products")
    //             dispatch({type:"PRODUCT_SUCCESS", payload:data.data})
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     getProduct()
    // },[dispatch])
    console.log(props.text)
  return (
    <div>
        <p>{props.text}</p>
    {/* {text.map((item,i)=>{
        return(
            <p>{item.itemName}</p>
        )
    })}         */}
    </div>
  )
}

export default Display
