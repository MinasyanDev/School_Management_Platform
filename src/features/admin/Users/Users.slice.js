import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addGroups, addUser, changeGroupTeacher, deleteGroups, deleteUser, getGroups, getStudents, getTeachers, showUsers, updateStudent } from "../../../services/api"

const initialState = {
   error: '',
   items:[],
   students:[],
   teachers:[],
   groups:[],
}

export const addUserAction = createAsyncThunk('admin/try', async (data,thunk) => {
   const item=await addUser(data)
   thunk.dispatch(showUserAction())
   return item
})

export const showUserAction = createAsyncThunk('show/try', async () => {
   return await showUsers()
})

export const deleteUserAction = createAsyncThunk('delete/try', async (data) => {
   return await deleteUser(data)
})

export const getStudentAction = createAsyncThunk('getStud/try', async () => {
   return await getStudents()
})

export const getTeacherAction = createAsyncThunk('getTeachers/try', async () => {
   return await getTeachers()
})

export const addGroupAction = createAsyncThunk('addGroup/try', async (data,thunk) => {
   const item=await addGroups(data)
   thunk.dispatch(showGroupAction())
   return item
})

export const showGroupAction = createAsyncThunk('getGroups/try', async () => {
   return await getGroups()
})

export const deleteGroupAction = createAsyncThunk('deleteGroups/try', async (data) => {
   return await deleteGroups(data)
})

export const updateStudentAction = createAsyncThunk('updateStudent/try', async (data) => {
   return await updateStudent(data)
})

export const changeGroupTeacherAction = createAsyncThunk('changeGroupTeacher/try', async () => {
   return await changeGroupTeacher()
})



const UserSlice = createSlice({
   name: 'admin/Users',
   initialState,
   reducers:{},
   extraReducers: builder => {
      builder.addCase(addUserAction.fulfilled, (state, action) => {
         console.log(action.payload)
      })
      builder.addCase(showUserAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.items = action.payload.users
      })
      builder.addCase(deleteUserAction.fulfilled, (state, action) => {
         state.items=state.items.filter(x=>x.id!=action.payload.id)
         console.log(action.payload)
      })
      builder.addCase(getStudentAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.students = action.payload.students

      })
      builder.addCase(getTeacherAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.teachers = action.payload.teachers
      })
      builder.addCase(addGroupAction.fulfilled, (state, action) => {
         if(action.payload.status=='error'){
            state.error=action.payload.message
         }else{state.error=''}
         console.log(action.payload)
      })
      builder.addCase(showGroupAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.groups = action.payload.groups
      })
      builder.addCase(deleteGroupAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.groups=state.groups.filter(x=>x.id!=action.payload.id)
      })
      builder.addCase(updateStudentAction.fulfilled,(state,{payload:{status, body}})=>{
         if(status == "ok"){
           let index=state.students.findIndex(elm=>elm.id==body.id)
           state.students[index]=body
         }
      })
      builder.addCase(changeGroupTeacherAction.fulfilled, (state, action) => {
         console.log(action.payload)
      })
   
   }
})
export const  UsersReduser=UserSlice.reducer