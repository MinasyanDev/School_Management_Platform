import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useOutletContext} from "react-router-dom"
import { getHomeworkskAction } from "../../teacher/Homework/Homework.slice";
import { useState } from "react";

const HomeworkStudent = () => {
   const homeworks = useSelector(state => state.homework.items)
   const [currentLesson, setCurrentLesson] = useState(-1)
   const [content, setContent] = useState("")
   const account  = useOutletContext()
   const dispatch = useDispatch()
   console.log(account)
   
   useEffect(() => {
      dispatch(getHomeworkskAction(account.group))
   }, [])

   useEffect(() => { 
      let text = homeworks.find(elm => elm.id == currentLesson)
      if (text) {
         setContent(text.content)
      }
   }, [currentLesson])
   return <div>
      <h1>This is the homework page</h1>
      <select value={currentLesson} onChange={e => setCurrentLesson(e.target.value)}>
         <option></option>
         {
            homeworks.map(elm => {
               return <option value={elm.id}>{elm.title}</option>
            })
         }
      </select>
      <div className="bg-success">
         {content}
      </div>
   </div>
}
export default HomeworkStudent