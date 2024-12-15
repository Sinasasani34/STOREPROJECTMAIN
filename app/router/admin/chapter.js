const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();
// adding chapter
router.put("/add", ChapterController.addChapter); // create new chapter
// get lists of chapters by id
router.get("/list/:courseID", ChapterController.chaptersOfCourse);
// remove chapter
router.patch("/remove/:chapterID", ChapterController.removeChapterById) 
// updateing chapter
router.patch("/update/:chapterID", ChapterController.updateChapterById) 
module.exports = {
    AdminApiChapterRoutes: router
}