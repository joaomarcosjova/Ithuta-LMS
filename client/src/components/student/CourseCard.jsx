import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

// Component to display a single course card
const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link 
      to={'/course/' + course._id} 
      onClick={() => scrollTo(0, 0)} 
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      {/* Course Thumbnail */}
      <img className="w-full" src={course.courseThumbnail} alt="courseThumbnail" />
      <div className="p-3 text-left">
        {/* Course Title */}
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        {/* Educator Name */}
        <p className="text-gray-500">{course.educator.name}</p>

        {/* Course Rating Section */}
        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                className="w-3.5 h-3.5"
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt="star"
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>

        {/* Course Price */}
        <p className="text-base font-semibold text-gray-800">
          {currency} {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

// Ensures the courses are displayed in rows of 3
const CourseGrid = ({ courses }) => {
  return (
    // Using flex-wrap to arrange courses in rows of 3
    <div className="flex flex-wrap -m-2">
      {courses.map((course) => (
        // Each course takes 1/3 of the width on medium screens, 1/2 on small screens, and full width on extra small
        <div key={course._id} className="w-full sm:w-1/2 md:w-1/3 p-2">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  )
}

export default CourseGrid
