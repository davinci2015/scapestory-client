import gql from 'graphql-tag'

export const PLANT_BY_ID = gql`
    query plantById($id: Int!) {
        plant: plantById(id: $id) {
            id
            name
            description
            image
            origin
            minHeight
            maxHeight
            position
            luminosity
            growthSpeed
            difficulty
        }
    }
`
