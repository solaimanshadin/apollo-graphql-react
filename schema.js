const axios = require('axios');

const {
    GraphQLInt, 
    GraphQLObjectType,
    GraphQLString, 
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require("graphql");

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    description:"This will represent all launches",
    fields: () => ({
        flight_number: { type:GraphQLInt},
        mission_name: { type:GraphQLString},
        launch_year: { type:GraphQLString},
        launch_date_local: { type:GraphQLString},
        launch_success: { type:GraphQLBoolean},
        rocket: { type:RocketType},
    })
})

// Rocket type
const RocketType = new GraphQLObjectType({
    name: "Rocket",
    description:"This will represent Rocket info",
    fields: () => ({
        rocket_id: { type:GraphQLString},
        rocket_name: { type:GraphQLString},
        rocket_type: { type:GraphQLString}
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      launches: {
        type: new GraphQLList(LaunchType),
        resolve() {
          return axios
            .get('https://api.spacexdata.com/v3/launches')
            .then(res => res.data);
        }
      },
      rockets: {
        type: new GraphQLList(RocketType),
        resolve() {
          return axios
            .get('https://api.spacexdata.com/v3/rockets')
            .then(res => res.data);
        }
      },
      launch:{
        type:LaunchType,
        args:{
            flight_number:{type:GraphQLInt}
        },
        resolve(parent, args){
            return axios
            .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
            .then(res => res.data);
        }
      }
    }
   
});


module.exports= new GraphQLSchema({
    query: RootQuery
})