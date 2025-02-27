// import React from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, currency, calculateRating }) => {
  if (!course) return null;

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      {course.courseThumbnail && (
        <img className="w-full" src={course.courseThumbnail} alt="Course Thumbnail" />
      )}
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator?.name || 'Unknown Educator'}</p>

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
          <p className="text-gray-500">{course.courseRatings?.length || 0}</p>
        </div>

        <p className="text-base font-semibold text-gray-800">
          {currency}{' '}
          {(
            course.coursePrice -
            (course.discount || 0) * course.coursePrice / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

// ✅ Define PropTypes to fix ESLint errors
CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courseThumbnail: PropTypes.string.isRequired,
    courseTitle: PropTypes.string.isRequired,
    educator: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    courseRatings: PropTypes.arrayOf(PropTypes.object).isRequired,
    coursePrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  calculateRating: PropTypes.func.isRequired,
};

export default CourseCard;
