import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTest, chuseAnswer, getTest, getTestId } from '../../../services/api';

const initialState = {
   error:'',
   tests:[],
   item:{},
   color: {},
   count: 0,
   lastAnswer:null
}

export const addTestAction = createAsyncThunk('addTest/try', async (obj) => {
   return await addTest(obj)
})
export const getTestAction = createAsyncThunk('allTests/try', async () => {
   return await getTest()
})
export const getTestIdAction = createAsyncThunk('test/id/try', async (id) => {
   return await getTestId(id)
})
export const chuseAnswerAction = createAsyncThunk('checkQuestion/:test/:quest/try', async ({ quest, id }) => {
   return await chuseAnswer(quest, id)
})

const TestSlice = createSlice({
   name: 'Test',
   initialState,
   reducers: {
      setTest(state,action){
         let x=state.item.questions.map(elem=>{
            if(elem.id==action.payload.quest){
               elem.hasAnswered = true
            }
            return elem
         })
         
         state.lastAnswer = action.payload.ans
      }
   },
   extraReducers: builder => {
      builder.addCase(addTestAction.fulfilled, (state, action) => {
         console.log(action.payload);
      })
      builder.addCase(getTestAction.fulfilled, (state, action) => {
         state.tests=action.payload.tests
         console.log(action.payload);
      })
      builder.addCase(getTestIdAction.fulfilled, (state, action) => {
         state.item = action.payload.result
         state.item.questions.forEach(elm => {
            elm.hasAnswered = false 
            elm.correct = null
            elm.correctAnswer = null
         })
         console.log(state.item)
      })
      builder.addCase(chuseAnswerAction.fulfilled, (state, action) => {
         state.color[action.payload.result.id]=true
         console.log(action.payload, state.lastAnswer);
         if (state.lastAnswer == action.payload.result.id) {
            state.count++
         }
      })
   }
   
})

export const TestReduser = TestSlice.reducer
export const {setTest} = TestSlice.actions