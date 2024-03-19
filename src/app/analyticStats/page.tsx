import React from 'react';
import UserList from '@/components/analyticStats/UserList';
import GameStats from '@/components/analyticStats/GameStats';
import CourseInfo from '@/components/analyticStats/CourseInfo';
import { prisma } from '@/lib/db';
// import { User } from '@prisma/client';

type Props = {}

const Dashboard: React.FC = async (props: Props) => {
  
// const users = await prisma.user.findMany();
const games = await prisma.game.findMany();
const courses = await prisma.course.findMany();

return (
    <div>
        <h1>Dashboard</h1>
        {/* <UserList users={users as User[]} /> */}
        <GameStats games={games} />
        <CourseInfo courses={courses} />
    </div>
);
};

export default Dashboard;
