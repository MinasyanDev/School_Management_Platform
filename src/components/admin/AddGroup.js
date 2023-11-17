import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addGroupAction, showGroupAction } from "../../features/admin/Users/Users.slice"
import { useEffect } from "react"


const AddGroup = () => {
    const teacherGroup=useSelector(state=>state.users.teachers)
    const studentGroup=useSelector(state=>state.groups.availableStudents)
    const error=useSelector(state=>state.users.error)

    const[group,setGroup]= useState({
        name:'',
        teacher:'',
        students:[],
        schedule:'',
        hours:''
    })
    const dispatch=useDispatch()

    const handleAdd=(e)=>{
        e.preventDefault()
        dispatch(addGroupAction(group))
        setGroup({
            name:'',
            teacher:'',
            students:[],
            schedule:'',
            hours:''
    })
    }
    
    useEffect(() => {
        dispatch(showGroupAction())
    },[])

    return  <div className="col md-6">
        <div>
            <h1>AddGroup</h1>
            <p style={{color:'red'}}>{error}</p>
            <form className="form" onSubmit={handleAdd}>
                <div>
                    <label>group name</label>
                    <input
                        style={{width:400}}
                        className="form-control" 
                        value={group.name}
                        onChange={e=>setGroup({...group,name:e.target.value})}
                    />
                </div>
                <div>
                    <label>teacher</label>
                    <select 
                        style={{width:400}}
                        value={group.teacher}
                        onChange={e=>setGroup({...group,teacher:e.target.value})}
                        className="form-control">
                            <option value=""></option>
                        
                        {
                            teacherGroup.map(elem=><option value={elem.id}>{elem.name} {elem.surname}</option>)
                        }

                    </select>
                </div>
                <div>
                    <label>students</label>
                    <select 
                        style={{width:400}}
                        onChange={e=>{
                            if(group.students.includes(+e.target.value)){
                            const student=group.students.filter(elem=>elem!=+e.target.value)
                            setGroup({...group,student})
                        }else{
                            setGroup({...group,students:[...group.students,+e.target.value]})
                        }
                        }
                    }
                        className="form-control">
                            <option value=""></option>
                        
                        {
                            studentGroup.map(elem =>
                                <option disabled={group.students.find(x => x == elem.id)} value={elem.id}>
                                    {elem.name} {elem.surname}
                                </option>)
                            }

                    </select>
                    {
                        <ul>
                        <h5>Students included</h5>
                        {group.students.map(elem=>{
                            const student=studentGroup.find(item=>item.id==elem)
                        return student && <li key={student.id}>{student.name} {student.surname}</li>
                        })}
                    </ul>
                    }
                </div>
                <div>
                    <label>schedule</label>
                    <select 
                            style={{width:400}}
                            className="form-control" 
                            value={group.schedule} 
                            onChange={e=>setGroup({...group,schedule:e.target.value})}>

                            <option value=""></option>
                            <option value={"v1"}>Monday,Wednesday,Friday</option>
                            <option value={"v2"}>Tuesday,Thursday,Saturday</option>
                    </select>
                </div>
                <div>
                    <label>hours</label>
                    <select 
                        style={{ width: 400 }}
                        value={group.hours}
                        onChange={e=>setGroup({...group,hours:e.target.value})}
                        className="form-control">

                        <option value=""></option>
                        <option value={"v1"}>10:00-12:00</option>
                        <option value={"v2"}>12:00-14:00</option>
                        <option value={"v3"}>14:00-16:00</option>
                        <option value={"v4"}>16:00-18:00</option>
                        <option value={"v5"}>18:00-20:00</option>
                    </select>
                </div>
                <br/>
                <button className="btn btn-success">Save</button>

                
            </form>
        </div>
    </div>
}

export default AddGroup