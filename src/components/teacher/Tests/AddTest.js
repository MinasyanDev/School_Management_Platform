import { useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom";
import { addTestAction } from '../../../features/teacher/Tests/Test.slice';

const AddTest = () => {
   const [test, setTest] = useState({
      name: '',
      questions: [
      //    {
      //       id: 101,
      //       text: 'what will be the output andefined+andefined?',
      //       answers: [
      //          {id:101,text:'error',correct:false},
      //          {id:102,text:'NaN',correct:true},
      //          {id:103,text:'undefined',correct:false},
      //       ]
      //    }
      ]
   })

   const dispatch=useDispatch()

   const handleAddQuestion = () => {
      if (test.questions.length > 0) {
         const lastQuestion = test.questions[0];
         if (
             lastQuestion.text === '' ||
             !lastQuestion.answers.some(answer => answer.correct === true) ||
             lastQuestion.answers.some(answer => answer.text === '')
         ) {
             return
         }
     }
      setTest({...test,questions:[{id:Date.now(),text:'', answers:[]}, ...test.questions]})
   }

   const addAnswer = quest => {
      quest.answers.push({ id: Date.now(), text: '', correct: false })
      setTest({...test})
   }

   const updateQText = (quest, text) => {
      quest.text = text
      setTest({...test})      
   }
   const updateAnswerText = (quest, ans, text) => {
      const questionIndex = test.questions.findIndex((q) => q.id === quest.id);
      const answerIndex = test.questions[questionIndex].answers.findIndex((answer) => answer.id === ans.id);
      test.questions[questionIndex].answers[answerIndex].text = text;
      setTest({ ...test });
};

   const handleSubmit = e => {
      e.preventDefault()
      dispatch(addTestAction(test))
      console.log(test);
   }
   
   const doubleChange = (quest, ans) => {
      quest.answers.forEach(elm => elm.correct = false)
      ans.correct = true
      setTest({...test})
    }

   return <div>
      <h1>AddTest</h1>
      <button onClick={handleAddQuestion} className='btn btn-info'>Add question</button>

      <form onSubmit={handleSubmit}>
         <div className="my-4">
            <input
               type="text"
               value={test.name}
               className="form-control"
               placeholder="name of the test"
               onChange={e=>setTest({...test,name:e.target.value})}
            />
         </div>
         <div className="row">
            <div className="col-md-4">
               <p>questions {test.questions.length}</p>
               {
                  test.questions.map(quest => {
                     return <div className="my-4 p-5 bg-info" key={quest.id}>
                        <input
                           type="text"
                           value={quest.text}
                           className="form-control"
                           onChange={e=>updateQText(quest, e.target.value)}
                        />
                        <div className="my-5">
                           {
                              quest.answers.map(ans => {
                                 return <input
                                    key={ans.id}
                                    value={ans.text}
                                    className={ans.correct ? 'bg-warning' : ''}
                                    onDoubleClick={() => doubleChange(quest, ans)}
                                    onChange={e => updateAnswerText(quest, ans, e.target.value)}
                                 />
                              })
                           }
                           <button onClick={() => addAnswer(quest)} type="button" className='btn btn-primary'>Add answer</button>
                        </div>
                     </div>
                  })
               }
            </div>
         </div>
         <button className="btn btn-success" >Save</button>
      </form>
   </div>
}
export default AddTest