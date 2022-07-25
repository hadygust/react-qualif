import { createContext, useContext, useState } from "react"

export const THEME = {
    light:{
        id:2,
        background:"#ececec",
        fontColor:"#000000",
        secColor:"#ffffff"
    },
    dark:{
        id:3,
        background:"#383838",
        fontColor:"#ffffff",
        secColor:"#4b4c4d"
    },
    default:{
        id:1,
        background:"#bfe0ff",
        fontColor:"#393939",
        secColor:"#ffdab3"
    }
}

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) =>{

    const [curTheme,setCurTheme] = useState(THEME.dark)



    return(
    <ThemeContext.Provider value={{curTheme, setCurTheme}}>
        {children}
    </ThemeContext.Provider>

    )
}

export const useTheme = ()=>{
    return useContext(ThemeContext)
}
