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
                                <div className="dataAll__form-row">
                                    <label>Title : *</label>&nbsp;
                                    <input type="text" id="ctitle" size='50' required />
                                </div>

                                <div className="dataAll__form-row">
                                    <label>Description : *</label>&nbsp;
                                    <textarea id='cdescription' required />
                                </div>

                                <div className="dataAll__form-row">
                                    <label>Start Date : *</label>&nbsp;
                                    <input type="date" id="cstartdate" name="cstartdate" required />

                                    <label>End Date : *</label>&nbsp;
                                    <input type="date" id="cenddate" name="cenddate" required />
                                </div>

                                <div className="dataAll__form-row">
                                    <label>Cover Image :</label>&nbsp;
                                    <input type="file" id="ccover" name="ccover" />
                                </div>
                                
                                <div className="dataAll__form-row">
                                    <input type="button" value='Save' /> &nbsp;&nbsp;
                                    <input type="reset" value='Reset' /> &nbsp;&nbsp;
                                    <input type="button" value='Cancel' onClick={pageClick('/courses')} /> &nbsp;&nbsp;
                                </div>
                                
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