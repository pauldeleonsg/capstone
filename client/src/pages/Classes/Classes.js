import React from "react";
import { useLocation } from "react-router-dom";

//import Test from "../../components/Static/Test/Test";

import jsonCourses from '../../Data/courses.json';
import { fxnSliceString } from "../../Utilities/Utilities";

import './Classes.scss';


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}


const Classes = () => {

    let query = useQuery();
    
    const classID = query.get("id");

    const selected = jsonCourses.find(course => course.course_id === classID);

    
    return(
        <>
        <div className="classes">
            

            <div className="classes__header">
                <h1>{selected.course_title}</h1>
            </div>
            <div className="classes__crumbs">
                <a href='/courses'>Courses</a> &gt;&nbsp;
                {fxnSliceString(selected.course_title, 24)}
            </div>
            
            <div className="classes__item">
                <div className="classes__subitem">
                    
                </div>
                <div className="classes__subitem">
                    <img src={selected.course_cover} alt='' />
                    <p>Start Date: {selected.course_startdate} | End Date: {selected.course_enddate}</p>
                    <p>{selected.course_description}</p>
                </div>
            </div>
        </div>
        </>
    )
} 


export default Classes;