const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime, deleteInvalidPropertyInObject, copyObject } = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { ObjectIdValidator } = require("../../../validators/public.validator");

class EpisodeController extends Controller {

    async addNewEpisode(req, res, next) {
        try {
            const { title, text, type, chapterID, courseID, filename, fileUploadPath } = await createEpisodeSchema.validateAsync(req.body);
            const fileAddress = path.join(fileUploadPath, filename)
            const videoAddress = fileAddress.replace(/\\/g, "/")
            const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
            const seconde = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconde)
            const episode = {
                title,
                text,
                type,
                time,
                videoAddress
            }
            const createEpisodresult = await CourseModel.updateOne({
                _id: courseID, "chapters._id": chapterID
            }, {
                $push: {
                    "chapters.$.episodes": episode
                }
            })
            if (createEpisodresult.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("افزودن اپیزود انجام نشد")
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "افزودن اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeEpisode(req, res, next) {
        try {
            const { id: episodeID } = await ObjectIdValidator.validateAsync({ id: req.params.episodeID });
            await this.getOneEpisode(episodeID)
            const removeEpisodresult = await CourseModel.updateOne({
                "chapters.episodes._id": episodeID
            }, {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeID
                    }
                }
            })
            if (removeEpisodresult.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("حذف اپیزود انجام نشد")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateEpisode(req, res, next) {
        try {
            const { episodeID } = req.params
            const episode = await this.getOneEpisode(episodeID)
            const { filename, fileUploadPath } = req.body
            let blackListFields = ["_id"]
            if (filename && fileUploadPath) {
                const fileAddress = path.join(fileUploadPath, filename)
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`
                const seconds = await getVideoDurationInSeconds(videoURL);
                req.body.time = getTime(seconds);
                blackListFields.push("filename")
                blackListFields.push("fileUploadPath")
            } else {
                blackListFields.push("time")
                blackListFields.push("videoAddress")
            }
            const data = req.body;
            deleteInvalidPropertyInObject(data, blackListFields)
            const newEpisode = {
                ...episode,
                ...data
            }
            const editEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id": episodeID
            }, {
                $set: {
                    "chapters.$.episodes": newEpisode
                }
            })
            if (!editEpisodeResult.modifiedCount)
                throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد")
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "ویرایش اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getOneEpisode(episodeID) {
        const course = await CourseModel.findOne({ "chapters.episodes._id": episodeID }, {
            "chapters.episodes._id": 1
        })
        if (!course) throw new createHttpError.NotFound("اپیزودی یافت نشد")
        const episode = course?.chapters?.[0]?.episodes?.[0]
        if (!episode) throw new createHttpError.NotFound("اپیزودی یافت نشد")
        return copyObject(episode)
    }

}

module.exports = {
    EpisodeController: new EpisodeController()
}