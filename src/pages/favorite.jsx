import { Link } from "react-router-dom";
import Card, { CardDetail } from "../compenents/Card";
import Navbar from "../compenents/Navbar";
import { useTheme } from "../lib/context/theme";

export const Favorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const {curTheme, setCurTheme} = useTheme();

    console.log(favorites[0]);

    return ( 
        <>
        <Navbar></Navbar>
        <div style={{
            backgroundColor: curTheme.background,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "1000vh"
        }} >
            {(favorites[0] === undefined) ?
            <div>
                <p style={{color: curTheme.fontColor}}>Empty</p>

            </div>
                :
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1rem",
                    textDecoration: "none"
                  }}>
                    {favorites.map((char, idx) => {
                        char = char.character
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
        </>
     );
}