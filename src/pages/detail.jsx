import { useQuery } from "@apollo/client";
import { Heart } from "heroicons-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../compenents/Navbar";
import { useTheme } from "../lib/context/theme";
import { GET_CHARACTER } from "../lib/queries/GetCharacter";

const Detail = () => {
  const p = useParams();

  const [character, setCharacter] = useState();
  const [isFav, setIsFav] = useState(false)

  const { curTheme, setCurtheme } = useTheme();

  const { error, loading, data } = useQuery(GET_CHARACTER, {
    variables: {
      id: p.id,
    },
  });

  // if (!loading) {
  //   console.log(data.character);
  // }

  const favorites = JSON.parse(localStorage.getItem("favorites"));

  const checkIfFavorite = () => {
    let flag = false;
    console.log(data);
    console.log(favorites);
    if (data === undefined) {
      setIsFav(false);
      return;
    }
    favorites.forEach((element) => {
      if (element.character.id === data.character.id) {
        flag = true;
      }
    });
    console.log("test");
    if (flag === true) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  };

  useEffect(() => {
    if (favorites === null) {
      return;
    }
    console.log("fav dong");
    checkIfFavorite();
    console.log(isFav);
  }, [favorites]);

  const addToFav = () => {
    var arr = [];
    if (favorites !== null) {
      var arr = favorites;
    }
    arr.push(data);
    setIsFav(true);
    localStorage.setItem("favorites", JSON.stringify(arr));
  };

  const removeFromFav = () => {
    var arr = favorites;
    let count = 0;
    arr.forEach((element) => {
      if (element.character.id === data.character.id) {
        arr.splice(count, 1);
      }
      count++;
    });
    setIsFav(false);
    localStorage.setItem("favorites", JSON.stringify(arr));
  };

  return (
    <div
      style={{
        color: curTheme.fontColor,
        backgroundColor: curTheme.background,
      }}
    >
      <Navbar></Navbar>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          <div
            style={{
              width: "100%",
              height: "28rem",
              overflow: "hidden",
              backgroundColor: "red",
            }}
          >
            <img
              src={data.character.image}
              alt="foto"
              style={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
          </div>

          <div style={{ padding: "1rem" }}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                display: "flex",
                justifyContent:"space-between",
                alignItems: "center",
                boxSizing: "border-box"
              }}
            >
              {data.character.name}
              <Heart onClick={() => {isFav ? removeFromFav() : addToFav()}} style={{
                transform: "scale(1.2)",
                boxSizing: "border-box",
                marginRight: "1rem",
                fill: !isFav ? curTheme.fontColor : "red"
              }}></Heart>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  marginTop: "0.05rem",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor:
                      data.character.status === "Alive" ? "limegreen" : "red",
                  }}
                ></div>

                <div
                  style={{
                    fontWeight: "500",
                    fontSize: "0.9rem",
                  }}
                >
                  {data.character.status} -{" "}
                  {data.character.species === "unknown"
                    ? "Unknown Species"
                    : data.character.species}{" "}
                  -{" "}
                  {data.character.gender === "unknown"
                    ? "Unknown Gender"
                    : data.character.gender}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "800",
                  }}
                >
                  Origin:
                </div>

                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                  }}
                >
                  {data.character.origin.name}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "800",
                  }}
                >
                  Last seen in:
                </div>

                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                  }}
                >
                  {data.character.location.name}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "800",
                  }}
                >
                  Appearance on:
                </div>

                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  <ul>
                    {data.character.episode.map((eps, idx) => {
                      return (
                        <li>
                          {eps.episode} - {eps.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
