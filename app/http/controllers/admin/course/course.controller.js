const createHttpError = require("http-errors");


const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes")
const path = require("path");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../../../models/course");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
class CourseController extends Controller {
    async getListOfCourse(req, res, next) {
        try {
            const { search } = req.query;
            let courses;
            if (search) {
                courses = await CourseModel.find({ $text: { $search: search } })
                    .populate([
                        { path: "category", select: { title: 1 } },
                        { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
                    ]).sort({ _id: -1 })
            } else {
                courses = await CourseModel.find({})
                    .populate([
                        { path: "category", select: { children: 0, parent: 0 } },
                        { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
                    ]).sort({ _id: -1 })
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addCourse(req, res, next) {
        try {
            await createCourseSchema.validateAsync(req.body);
            const { fileUploadPath, filename } = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const { title, short_text, text, tags, category, price, discount, type } = req.body;
            const teacher = req.user._id;
            if (Number(price) > 0 && type === "free") {
                throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد")
            }
            const course = await CourseModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                type,
                image,
                time: "00:00:00",
                status: "notStarted",
                teacher
            })
            console.log(course)
            if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "دوره با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await CourseModel.findById(id);
            if (!course) {
                throw createHttpError.NotFound("دوره یافت نشد");
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findCourseById(id) {
        if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه صحیح نمیباشد")
        const course = await CourseModel.findById(id);
        if (!course) throw createHttpError.NotFound("دوره یافت نشد");
        return course
    }
}

module.exports = {
    CourseController: new CourseController(),
}