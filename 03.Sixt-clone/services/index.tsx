import request, {gql} from "graphql-request"


export const getCarList = async()=> {
  const query = gql`
  query cardList {
    carLists {
      marque
      price
      name
      id
      publishedAt
      updatedAt
      createdAt
      type
      image {
        url
      }
      places
      typeBoite

    }
  }
  
  
  `
  const result = await request('', query);
  return result
}