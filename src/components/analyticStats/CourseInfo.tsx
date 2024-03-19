// components/CourseInfo.tsx
import React from 'react';

interface Course {
  id: string;
  name: string;
  image: string;
}

interface CourseInfoProps {
  courses: Course[];
}

const CourseInfo: React.FC<CourseInfoProps> = ({ courses }) => {
  return (
    <div>
      <h2>Course Information</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <img src={course.image} alt={course.name} />
            <span>{course.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseInfo;
