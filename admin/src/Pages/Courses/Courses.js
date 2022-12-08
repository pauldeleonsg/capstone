import { Link } from "react-router-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import { CoursesAllTable } from "./CoursesAllTable";

import '../../Styles/DataAll.scss';
import '../../Styles/Form.scss';


const pageClick = (myLink) => () => {
    window.location.href=myLink;
}



const Courses = () => {

    //columns
    const courseTblCols = [
        { accessor: 'course_id', label: 'Course ID', tosort: 'Y' },
        { accessor: 'course_title', label: 'Course Title', tosort: 'Y' },
        { accessor: 'course_description', label: 'Description', tosort: 'N' },
        { accessor: 'course_startdate', label: 'Start Date', tosort: 'Y' },
        { accessor: 'course_enddate', label: 'End Date', tosort: 'Y' },
        { accessor: 'course_cover', label: 'Cover', tosort: 'N' },
        { accessor: '', label: 'Actions', tosort: 'N' },
    ];


    const [formData, setFormData] = useState(false);

    const [courseID, setCourseID] = useState(null);
    const [courseTitle, setCourseTitle] = useState(null);
    const [courseDescription, setCourseDescription] = useState(null);
    const [courseStartDate, setCourseStartDate] = useState(null);
    const [courseEndDate, setCourseEndDate] = useState(null);
    const [courseCover, setCourseCover] = useState(null);


    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "courseTitle") setCourseTitle(value);
        if(id === "courseDescription") setCourseDescription(value);
        if(id === "courseStartDate") setCourseStartDate(value);
        if(id === "courseEndDate") setCourseEndDate(value);
        if(id === "courseCover") setCourseCover(value);
        
    }

    const handleSubmit  = () => {
        alert(courseCover);
    }
    

    //courses
    const [courseList, setCourseList] = useState([]);

    const passCourseList = (data) => {
        setCourseList(data);
    }

    const getCourseList = () => {
        axios
            .get('http://localhost:5050/courses')
            .then(res => {
                setCourseList(res.data);
            });
    }


    useEffect(() => {
        getCourseList();
      }, []);



    return(
        <>
        <BrowserRouter>
            <Switch>

                <Route path="/courses" exact>
                    <div className="sub-header">
                        <a href='/dashboard'>Dashboard</a> ⇨&nbsp; 
                        <a href='/courses'>Courses</a> 
                    </div>

                    <div className="container">
                        <div className="dataAll">
                            <a href='/courses/add'>Click here to add new course</a>

                            <CoursesAllTable cols={courseTblCols} rows={courseList} />
                        </div>
                    </div>

                </Route>


                <Route path="/courses/add" exact>
                    <div className="sub-header">
                        <a href='/dashboard'>Dashboard</a> ⇨&nbsp; 
                        <a href='/courses'>Courses</a> ⇨&nbsp;
                        <a href='/courses/add'>Add New Course</a>
                    </div>

                    <div className="container">
                        <div className="dataAll">
                            
                            <div className="dataAll__form-card">
                                <form>
                                <div className="dataAll__form-row">
                                    <label>Title : *</label>&nbsp;
                                    <input type="text" size='50' required
                                        value={courseTitle} onChange = {(e) => handleInputChange(e)} id="courseTitle" />
                                </div>

                                <div className="dataAll__form-row">
                                    <label>Description : *</label>&nbsp;
                                    <textarea id='courseDescription' required
                                        value={courseDescription} onChange = {(e) => handleInputChange(e)} />
                                </div>

                                <div className="dataAll__form-row">
                                    <label>Start Date : *</label>&nbsp;
                                    <input type="date" required
                                        value={courseStartDate} onChange = {(e) => handleInputChange(e)} id="courseStartDate" />

                                    <label>End Date : *</label>&nbsp;
                                    <input type="date" required
                                        value={courseEndDate} onChange = {(e) => handleInputChange(e)} id="courseEndDate" />
                                </div>

                                <div className="dataAll__form-row">
                                    <label>Cover Image :</label>&nbsp;
                                    <input type="file" accept=".jpg,.jpeg,.gif,.png,.svg"
                                        value={courseCover} onChange = {(e) => handleInputChange(e)} id="courseCover" />
                                    (Image file type: JPEG, GIF, PNG, and SVG)
                                </div>
                                
                                <div className="dataAll__form-row">
                                    <input type='button' onClick={handleSubmit} value='Save' /> &nbsp;&nbsp;
                                    <input type="reset" value='Reset' /> &nbsp;&nbsp;
                                    <input type="button" value='Cancel' onClick={pageClick('/courses')} /> &nbsp;&nbsp;
                                </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </Route>
                
            </Switch>
        </BrowserRouter>



        {/* <div className="sub-header">
            <Link to="/dashboard">Dashboard</Link> ⇨&nbsp; 
            <Link to="/courses">Courses</Link>
        </div>

        <div className="container">
            <div className="dataAll">
                <Link to="/courses/add">Click here to add an item</Link>

                <CoursesAllTable cols={courseTblCols} rows={courseList} />
            </div>
        </div> */}
        </>
    )
}


export default Courses;