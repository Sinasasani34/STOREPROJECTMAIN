const { ghrapgQL_Schema } = require("../graphql/index.graphql")


function grapgQLConfog(req, res) {
    return {
        schema: ghrapgQL_Schema,
        graphiql: true,
        context: { req, res }
    }
}

module.exports = {
    grapgQLConfog
}