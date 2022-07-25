import { gql } from "@apollo/client";

export const GET_CHARACTER = gql`
    query GetChar($id:ID!){
        character(id:$id){
            id
            name
            species
            gender
            status
            type
            origin {
                name
                dimension
                created
            }
            location {
                name
                dimension
                created
            }
            created
            image
            episode{
                id,
                name,
                air_date,
                episode,
                created
            }
        }
    }
`
