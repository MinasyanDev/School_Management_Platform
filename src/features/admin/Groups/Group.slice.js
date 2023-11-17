import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addGroups, deleteGroups, getGroups} from "../../../services/api"

const initialState = {
   error: '',
   items:[],
   availableStudents:[],
   groups:[],
}

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


const UserSlice = createSlice({
   name: 'admin/Users',
   initialState,
   reducers:{},
   extraReducers: builder => {
      builder.addCase(addGroupAction.fulfilled, (state, action) => {
         if(action.payload.status=='error'){
            state.error=action.payload.message
         }else{state.error=''}
         console.log(action.payload)
      })
      builder.addCase(showGroupAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.groups = action.payload.groups
         state.availableStudents = action.payload.availableStudents
      })
      builder.addCase(deleteGroupAction.fulfilled, (state, action) => {
         console.log(action.payload)
         state.groups = state.groups.filter(x => x.id != action.payload.id)
         state.availableStudents=action.payload.availableStudents
      })
   
   }
})
export const  GroupReducer=UserSlice.reducer