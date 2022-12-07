// courses.js //

const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js').development);


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


// export this module
module.exports = router;