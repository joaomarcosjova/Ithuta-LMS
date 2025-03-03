import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link 
      to={'/course/' + course._id} 
      onClick={() => scrollTo(0, 0)} 
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg shadow-md flex flex-col"
    >
      {/* Course Thumbnail */}
      <img className="w-full h-48 object-cover" src={course.courseThumbnail} alt="courseThumbnail" />
      
      {/* Course Info */}
      <div className="p-4 text-left flex-1 flex flex-col justify-between">
        <div>
          {/* Course Title */}
          <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
          {/* Educator Name */}
          <p className="text-gray-500">{course.educator.name}</p>

          {/* Course Rating */}
          <div className="flex items-center space-x-2 mt-1">
            <p>{calculateRating(course)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-4 h-4"
                  key={i}
                  src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                  alt="star"
                />
              ))}
            </div>
            <p className="text-gray-500">({course.courseRatings.length})</p>
          </div>
        </div>

        {/* Course Price */}
        <p className="text-lg font-semibold text-gray-800 mt-2">
          {currency} {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard


// FIxed video display from the database to the frontend