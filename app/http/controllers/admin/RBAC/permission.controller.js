const { PermissionModel } = require("../../../../models/permission");
const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { deleteInvalidPropertyInObject, copyObject } = require("../../../../utils/functions");
class PermissionController extends Controller {
    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionModel.find({});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    permissions
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async createNewPermission(req, res, next) {
        try {
            const { name, description } = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionWithName(name)
            const permission = await PermissionModel.create({ name, description })
            if (!permission) throw createHttpError.InternalServerError("دسترسی ایجاد نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "دسترسی باموفقیت ایجاد شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async removePermission(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionWithID(id);
            const removePermissionResults = await PermissionModel.deleteOne({ _id: id });
            if (!removePermissionResults.deletedCount) throw createHttpError.InternalServerError("دسترسی حذف نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "دسترسی با موفقیت حذف شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async updatePermissionById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionWithID(id);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, [])
            const updatePermissionResult = await PermissionModel.updateOne({ _id: id }, {
                $set: data
            });
            if (!updatePermissionResult.modifiedCount) throw createHttpError.InternalServerError("ویرایش سطح انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "ویرایش سطح با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findPermissionWithName(name) {
        const permission = await PermissionModel.findOne({ name });
        if (permission) throw createHttpError.BadRequest("دسترسی قبلا ثبت شده")
    }

    async findPermissionWithID(_id) {
        const permission = await PermissionModel.findOne({ _id });
        if (!permission) throw createHttpError.NotFound("دسترسی یافت نشد")
        return permission
    }
}

module.exports = {
    PermissionController: new PermissionController()
}