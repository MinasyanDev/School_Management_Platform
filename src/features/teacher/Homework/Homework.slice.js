import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addHomework, getHomeworks} from '../../../services/api';

const initialState = {
  items:[]
}

export const addHomeworkAction = createAsyncThunk('addHomework/try', async (obj) => {
   return await addHomework(obj)
})
export const getHomeworkskAction = createAsyncThunk('getHomeworks/:group/try', async (group) => {
   return await getHomeworks(group)
})


const HomeworkSlice = createSlice({
   name: 'Homework',
   initialState,
   reducers: {
   },
   extraReducers: builder => {
      builder.addCase(addHomeworkAction.fulfilled, (state, action) => {
         console.log(action.payload);
      })
      builder.addCase(getHomeworkskAction.fulfilled, (state, action) => {
         state.items = action.payload.result
         console.log(action.payload);

      })
   }
   
})

export const HomeworkReduser = HomeworkSlice.reducer