const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./public.types");

const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields: {
        _id: { type: GraphQLString },
        user: { type: UserType },
        comment: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean }
    }
})
const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: {
        _id: { type: GraphQLString },
        user: { type: UserType },
        comment: { type: GraphQLString },
        answers: { type: new GraphQLList(CommentAnswerType) },
        show: { type: GraphQLBoolean },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString }
    }
})

module.exports = {
    CommentType
}