const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const app = express();
const cors = require("cors")
app.use(cors());
app.use(express.static('public'))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}))

app.get('*', (req,res) => {
  res.sendFile(__dirname, 'build', 'index.html')
})

const port = process.env.PORT || 1010;
app.listen(port , () => console.log("Listining for port", port))
