import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { LoginReduser } from '../features/auth/Login.slice';
import { UsersReduser } from '../features/admin/Users/Users.slice';
import { GroupReducer } from '../features/admin/Groups/Group.slice';
import { TestReduser } from '../features/teacher/Tests/Test.slice';
import { HomeworkReduser } from '../features/teacher/Homework/Homework.slice';

export const store = configureStore({
  reducer: combineReducers({
    login: LoginReduser,
    users: UsersReduser,
    groups: GroupReducer,
    tests: TestReduser,
    homework: HomeworkReduser
  })
});
