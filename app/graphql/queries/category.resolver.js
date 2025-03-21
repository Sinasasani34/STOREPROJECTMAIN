const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryModel } = require("../../models/categories");
const { CategoryType } = require("../typeDefs/category.type");

const CategoriesResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        field: { type: GraphQLString },
        authorizationToken: { type: GraphQLString }
    },
    resolve: async () => {
        const categories = await CategoryModel.find({ parent: undefined });
        return categories;
    }
}
const CategoryChiledResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const { parent } = args;
        const categories = await CategoryModel.find({ parent });
        return categories;
    }
}

module.exports = {
    CategoriesResolver,
    CategoryChiledResolver
}