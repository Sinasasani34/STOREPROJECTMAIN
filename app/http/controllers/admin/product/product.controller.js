const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../models/products");
const { deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeaturs, deleteInvalidPropertyInObject } = require("../../../../utils/functions");
const { createProdutSchema } = require("../../../validators/admin/product.schema");
const { ObjectIdValidator } = require("../../../validators/public.validator");
const Controller = require("../../controller");
const path = require("path")
const { StatusCodes: httpStatus } = require("http-status-codes");
const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKE: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    // COLORS: "bookmarks",
}
Object.freeze(ProductBlackList)

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            const productBody = await createProdutSchema.validateAsync(req.body)
            const { title, text, short_text, category, tags, count, price, discount, type } = productBody;
            const supplier = req.user._id;

            let feture = setFeaturs(req.body)

            const product = await ProductModel.create({
                title,
                text,
                short_text,
                category,
                tags,
                count,
                price,
                discount,
                images,
                feture,
                supplier,
                type,
            })
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ثبت محصول با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    
    async editProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const data = copyObject(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            data.feture = setFeaturs(req.body)
            let blackListFields = Object.values(ProductBlackList)
            deleteInvalidPropertyInObject(data, blackListFields)
            const updateProductResult = await ProductModel.updateOne({ _id: product._id }, { $set: data })
            if (updateProductResult.modifiedCount == 0) {
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: "خطای داخلی" }
            }
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "بروزرسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const search = req?.query?.search || "";
            let products;
            if (search) {
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig"),
                    }
                })
            } else {
                products = await ProductModel.find({})
            }
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    products
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    product
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const removeProductResult = await ProductModel.deleteOne({ _id: product._id })
            if (removeProductResult.deletedCount == 0) {
                throw createHttpError.InternalServerError();
            }
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "حذف محصول با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findProductById(productID) {
        const { id } = await ObjectIdValidator.validateAsync({ id: productID })
        const product = await ProductModel.findById(id)
        if (!product) {
            throw createHttpError.NotFound("محصولی یافت نشد")
        }
        return product;
    }
}

module.exports = {
    ProductController: new ProductController()
}