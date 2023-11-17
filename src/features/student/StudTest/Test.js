import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { chuseAnswerAction, getTestIdAction } from "../../teacher/Tests/Test.slice";
import styles from './Test.module.css'
import { setTest } from "../../teacher/Tests/Test.slice";

const Test = () => {
    const test=useSelector(state=>state.tests.item)
    const color = useSelector(state => state.tests.color)
    const count = useSelector(state => state.tests.count)
    const [selectedAns,setSelectedAns]=useState({})
    
    const dispatch=useDispatch()
    const {id} =useParams()

    useEffect(()=>{
        dispatch(getTestIdAction(id))
    },[])

    const trueAnswer = (quest,ans,hasAnswered) => {
        if(hasAnswered){
            return
        }
        dispatch(chuseAnswerAction({ quest, id }))
        dispatch(setTest({ quest, ans }))
        setSelectedAns((prev)=>{
            return {...prev,[ans]:true}
        })
    }
    
    
    const getClassname=(ans)=>{
        if (color[ans]) {
            return styles.answerGreen
        }
        if(selectedAns[ans]){
            return styles.answerRed 
        }else{
            return styles.answerWhite
        }
    }

    return <div>
        <div className="row">
            <h1>{count}/{ test.questions?.length}</h1>
            <div className="col-md-10">
               {
                    test.questions?.map(quest => {
                        let questClass = styles.question
                        
                        return <div className={questClass}  key={quest.id}>
                        <input
                           type="text"
                           value={quest.text}
                           className="form-control"
                        />
                        <div className="my-5 answers">
                           {
                              quest.answers.map(ans => {
                                  return <div className={getClassname(ans.id)} key={ans.id} onClick={()=>trueAnswer(quest.id,ans.id,quest.hasAnswered)}>
                                      {ans.text}
                                  </div>
                              })
                           }
                        </div>
                    </div>
                  })
               }
            </div>
        </div>
    </div>
}
export default Test