import { Children, useContext } from "react";
// import { ThemeContext, useTheme } from "../lib/Theme";
import {ThemeContext, useTheme} from "../lib/context/theme"

export default function Card({children,...attr}) {
  
  const{curTheme, setCurTheme} = useTheme()
  
  return (
      <div
      style={{
        backgroundColor:curTheme.secColor,
        display:"flex",
        flexDirection: "column",
        width: "80vw",
        alignSelf: "center",
        borderRadius: "1rem",
        overflow: "hidden",
        paddingBottom: "1rem",
      }}>
        {/* <div className="px-4 py-5 sm:p-6">{children}</div> */}
        {children}
      </div>
    )
  }


  export function CardDetail({children}){
    return<div style={{
        padding:"1.2 rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
    }}>
        {children}
    </div>
}

export function Button({children}){
  const{curTheme, setCurTheme} = useTheme()
  
  return <div
  style={{
    marginLeft:"5.2rem",
    width:"auto",
    paddingLeft:"0.4rem",
    paddingRight:"0.4rem",
    borderRadius:"5px",
    backgroundColor:curTheme.background
  }}>
    {children}
  </div>
}