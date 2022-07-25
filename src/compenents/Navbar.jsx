import React, { useState } from 'react'
import {LightBulb, Menu, MenuAlt1, X} from 'heroicons-react'
import { THEME, useTheme } from '../lib/context/theme'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [menus, setMenus] = useState([
    {
      name: "Home",
      link: "/",
    },{
      name: "List",
      link: "/list",
    },{
      name: "Favourite",
      link: "/favourite",
    },
  ])

  const {curTheme, setCurTheme} = useTheme()

  const [showNav, setShowNav] = useState(false)

  const changeTheme = () => {

    if(curTheme === THEME.dark){
      setCurTheme(THEME.light)
    } else {
      setCurTheme(THEME.dark)
    }
  }

  return (
    <>
      <div style={{
          position: "sticky",
          top: "0",
          width: "100vw",
          height: "4rem",
          backgroundColor: curTheme.secColor,
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          boxSizing: "border-box",
          zIndex: "100"
      }}>
          <img src={process.env.PUBLIC_URL + '/images/header-pic.png'} alt="mantap" />
          <Menu style={{alignSelf: "center"}} onClick={()=> {setShowNav(true)}}></Menu>
      </div>

      <div style={{
        position: "fixed",
        width: "16rem",
        height: "100vh",
        backgroundColor: curTheme.background,
        right: "0",
        top: "0",
        boxSizing: "border-box",
        zIndex: "101",
        display: showNav ? "block" : "none"
      }}>

        <X style={{
          position: "absolute",
          right: "32",
          top: "12",
          boxSizing: "border-box",
          fill: curTheme.fontColor
        }} onClick={() => {setShowNav(false)}}></X>

        {menus.map((menu, idx) => (
          <div key={idx} style={{
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: "700",
            marginTop: "1rem",
            marginLeft: "1rem"
          }}>
            <Link to={menu.link} style={{
              textDecoration: "none",
              color: curTheme.fontColor,
            }}>
              {menu.name}
            </Link>
          </div>
        ))}

        <div onClick={changeTheme} style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "600",
        }}>
          <LightBulb style={{
            fill: curTheme.fontColor,
            margin: "1rem"
          }}>
          </LightBulb>
          Change Theme
        </div>

        
        

      </div>
    </>
  )
}

export default Navbar