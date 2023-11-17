import { useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import AdminNav from './components/shared/AdminNav'
import Groups from './features/admin/Groups/Groups'
import Students from './features/admin/Students/Student'
import Teachers from './features/admin/Teachers/Teachers'
import Users from './features/admin/Users/Users'
import Login from './features/auth/Login'
import Teacher from './features/teacher/Teacher'
import TeacherNav from './components/shared/TeacherNav'
import { Auth } from './components/shared/Auth'
import StudentNav from './components/shared/StudentNav'
import Student from './features/student/Student'
import Tests from './features/teacher/Tests/Tests'
import StudTests from './features/student/StudTest/Tests'
import Test from './features/student/StudTest/Test'
import Homework from './features/teacher/Homework/Homework'
import HomeworkStudent from './features/student/StudHomework/Homework'


export const MyRoutes = () => {

    return <BrowserRouter>
        <Routes>
            <Route path='' element={<Login/>} />
            
            <Route path="" element={<Auth/>}>
                <Route path='admin' element={ <AdminNav/>} >
                    <Route path="" element={<Users/>}/>
                    <Route path="groups" element={<Groups/>}/>
                    <Route path="students" element={<Students/>}/>
                    <Route path="teachers" element={<Teachers/>} />
                </Route>
            
                <Route path='teacher' element={<TeacherNav />} >
                    <Route path="" element={<Teacher/>}/>
                    <Route path="tests" element={<Tests/>}/>
                    <Route path="homework" element={<Homework/>}/>
                </Route>
                <Route path='student' element={<StudentNav/>} >
                    <Route path="" element={<Student/>}/>
                    <Route path="tests" element={<StudTests/>}/>
                    <Route path="tests/:id" element={<Test />} />
                    <Route path="homework" element={<HomeworkStudent/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}

