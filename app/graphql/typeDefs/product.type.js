const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");
const { CommentType } = require("./comment.type");

const feturesType = new GraphQLObjectType({
    name: "feture",
    fields: {
        length: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) },
        madein: { type: GraphQLString },
    }
})

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        image: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLString },
        supplier: { type: UserType },
        feture: { type: feturesType },
        comments: { type: new GraphQLList(CommentType)}
    }
})

module.exports = {
    ProductType
}