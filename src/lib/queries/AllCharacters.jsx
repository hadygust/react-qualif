import {gql} from "@apollo/client"

export const ALL_CHARACTER = gql`
query all_characters($page:Int){
  characters(page:$page){
    results{
      id,
      name,
      species,
      gender,
      status,
      type,
      origin{
        name,
        dimension,
        created
      },
      location{
        name,
        dimension,
        created
      }
      created,
      image,
    }
  }
}
`
export const SEARCH_CHARACTER = gql`
query SearchChar($page:Int, $name:String) {
  characters(page: $page, filter: { name: $name }) {
    info {
      count
    }
    results{
      id,
      name,
      species,
      gender,
      status,
      type,
      origin{
        name,
        dimension,
        created
      },
      location{
        name,
        dimension,
        created
      }
      created,
      image,
    }
  }
}
`

// export const SEARCH_CHARACTER = gql`
// query search-character($name:String){
// 	characters(page:1, filter:{name:$name}){
//     results{
//       name,
//       species,
//       gender,
//       status,
//       type,
//       origin{
//         name,
//         dimension,
//         created
//       },
//       location{
//         name,
//         dimension,
//         created
//       }
//       created,
//       image,
//     }
//   }
// }
// `