// Courses.js //
//import jsonCourses from '../../Data/courses.json';


import './Courses.scss';


const pageClick = (myLink) => () => {
    window.location.href=myLink;
}


const Courses = () => {

    
    return (
        <>
        <div className='courses'>
            
            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-01-javascript.png')} alt='Javascript'
                onClick={pageClick('/classes?id=22120101')} />
                <span>Javascript</span>
            </div>

            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-02-css.png')} alt='CSS' />
                <span>CSS</span>
            </div>

            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-03-react.png')} alt='React Js' />
                <span>React Js</span>
            </div>

            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-04-mysql.png')} alt='MySQL' />
                <span>MySQL</span>
            </div>

        </div>


        <div className='courses'>
            
            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-05-pmp.png')} alt='Project Management' />
                <span>Project Management</span>
            </div>

            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-06-git.png')} alt='Git' />
                <span>Git</span>
            </div>

            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-07-node.png')} alt='Node Js' />
                <span>Node Js</span>
            </div>

            <div class="courses__box">
                <img src={require('../../Assets/Images/pic-hero-08-dns.png')} alt='DNS' />
                <span>DNS</span>
            </div>

        </div>
        </>
    )
}


export default Courses;