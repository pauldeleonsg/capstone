// courses.js //

const express = require('express');
const router = express.Router();
const {v4 : uuidv4} = require('uuid');

const knex = require('knex')(require('../knexfile.js').development);


// SELECT ALL COURSES
router.get('/', (req, res) => {
    knex('courses')
        .select({
            course_id: 'course_id',
            course_title: 'course_title'
        })
        .then((courses) => {
            return res.status(200).json(courses);
        })
        .catch((err) => {
            return res.status(400).json({success: false, message: 'TBL: COURSES - An error occurred, please try again later.'});
        })
})



// CREATE COURSE
router.post('/', (req, res) => {
    const recUuid = uuidv4();

    const newCourse = {
        "course_id": recUuid,
        "course_title": req.body.course_title,
        "course_description": req.body.course_description,
        "course_cover": '', //req.body.itemName,
        "course_startdate": req.body.description,
        "course_enddate": req.body.category,
        "course_createdate": req.body.status,
        "quantity": req.body.quantity
    }
    
    /*
    knex('courses')
        .select({
            course_id: 'course_id',
            course_title: 'course_title'
        })
        .then((courses) => {
            return res.status(200).json(courses);
        })
        .catch((err) => {
            return res.status(400).json({success: false, message: 'TBL: COURSES - An error occurred, please try again later.'});
        })
    */
   
});


// export this module
module.exports = router;