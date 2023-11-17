import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addHomeworkAction } from "../../../features/teacher/Homework/Homework.slice"
import { showGroupAction } from "../../../features/admin/Users/Users.slice"

const AddHomework = () => {
    const [homework,setHomework]=useState({
        title:'',
        content:'',
        group:{}
    })

    const groups=useSelector(state=>state.users.groups)

    const dispatch=useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addHomeworkAction(homework))
        console.log(homework);
    }
    useEffect(() => {
        dispatch(showGroupAction())
    }, [])

    return <div>
        <h1>AddHomework</h1>
            <p>Chuse the group</p>
        <div>
            <select value={homework.group} onChange={e=>setHomework({...homework,group:e.target.value})}>
                <option value="" key=""></option>
                {
                    groups.map(group => {
                        return <option value={group.id} key={group.id}>
                            {group.name}
                        </option>
                    })
                }
            </select>
        </div>
        <br/>
        <button className='btn btn-info'>Add Homework</button>

        <form onSubmit={handleSubmit}>
         <div className="my-4">
            <input
               type="text"
               value={homework.title}
               className="form-control"
               placeholder="title of the homework"
               onChange={e=>setHomework({...homework,title:e.target.value})}
            />
            </div>
        <div className="my-4">
            <textarea
            type="text"
            value={homework.content}
            className="form-control"
            placeholder="content of the homework"
            onChange={e=>setHomework({...homework,content:e.target.value})}
            />
         </div>
         <button className="btn btn-success" >Save</button>
      </form>
    </div>
}
export default AddHomework