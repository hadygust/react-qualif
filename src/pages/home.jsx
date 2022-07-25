import React, { useEffect, useState } from 'react'
import Card, { CardDetail } from '../compenents/Card'
import Navbar from '../compenents/Navbar'
import { useTheme } from '../lib/context/theme'
import { useQuery } from '@apollo/client'
import { ALL_CHARACTER, SEARCH_CHARACTER } from '../lib/queries/AllCharacters'
import { Link } from 'react-router-dom'

const Home = () => {

  const{curTheme, setCurTheme} = useTheme()

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const searchChar = (e) => {
    e.preventDefault()
    // if(e.key === 'Enter'){
      setSearch(e.target.charName.value)
    // }
  }

  const {loading, error, data} = useQuery(SEARCH_CHARACTER, {
    variables:{
      page: page,
      name: search
    }
  })
  

  const [characters, setCharacters] = useState([])


  return (

    <div style={{
        height: search === "" ? "100vh" : "100%",
        backgroundColor: curTheme.background,
        overflow: "hidden"
    }}>

    <Navbar></Navbar>

    {(!loading && search === "") ? 
    
        <div style={{
            width: "100vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            paddingTop: "10%",
            alignItems: "center",
        }}>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <img src={process.env.PUBLIC_URL + '/images/rick-and-morty.png'} alt="logo" style={{
                    width: "80%",
                    height: "auto",
                }} />
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <form onSubmit={searchChar}>
                    <input type="text" placeholder='search character' name='charName' style={{
                        width: "20rem",
                        height: "1.5rem",
                        borderRadius: "0.5rem",
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",
                        backgroundColor: curTheme.secColor
                    }}/>
                </form>
            </div>

        </div>
        : 
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
      }}>
            <div>
                <form onSubmit={searchChar}>
                    <input type="text" placeholder='search character' name='charName' style={{
                        width: "23rem",
                        height: "1.5rem",
                        marginTop: "1rem",
                        borderRadius: "0.5rem",
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",
                        backgroundColor: curTheme.secColor
                    }}/>
                </form>
            </div>
            

            {loading ? null : 
            
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
            textDecoration: "none"
          }}>
            {data.characters.results.map((char, idx) => {
              return (
                <Link key={idx} to={"/detail/" + char.id} style={{
                  textDecoration: "none",
                  color: curTheme.fontColor,
                }}>
                <Card key={idx}>
                  <CardDetail>
                    <div style={{
                      width: "100%",
                      height: "20rem",
                      overflow: "hidden",
                    }}>
                      <img src={char.image} alt="a" style={{width: "100%"}}/>
                    </div>
                    <div style={{
                      paddingLeft: "0.5rem",
                      paddingRight: "0.5rem",
                    }}>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem"
                      }}>
                        <div style={{
                          fontSize: "1.75rem",
                          fontWeight: "800",
                        }}>
                          {char.name}
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            marginTop: "0.05rem"
                          }}>
                            <div style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: (char.status === "Alive") ? "limegreen" : "red",
                            }}>
                            </div>
                            
                            <div style={{
                              fontWeight: "500",
                              fontSize: "0.9rem"
                            }}>
                              {char.status} - {char.species}
                            </div>
                          </div>
                        </div>

                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                        }}>
                          <div style={{
                            fontSize: "1.125rem",
                            fontWeight: "800"
                          }}>Origin:</div>

                          <div style={{
                            fontSize: "1.25rem",
                            fontWeight: "600"
                          }}>{char.origin.name}</div>
                        </div>

                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                        }}>
                          <div style={{
                            fontSize: "1.125rem",
                            fontWeight: "800"
                          }}>Last seen in:</div>
                          
                          <div style={{
                            fontSize: "1.25rem",
                            fontWeight: "600"
                          }}>{char.location.name}</div>
                        </div>

                      </div>
                      <div>

                      </div>
                    </div>
                  </CardDetail>
                </Card>
                </Link>
              )
            }
            )}
          </div>
          }
        </div>
    }

    </div>
)}

export default Home