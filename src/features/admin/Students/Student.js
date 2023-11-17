import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStudentAction, showGroupAction, showUserAction, updateStudentAction } from "../Users/Users.slice"

const Students = () => {
    const items = useSelector(state => state.users.students)
    const groups=useSelector(state=>state.users.groups)
    const dispatch=useDispatch()

    const [edit,setEdit]=useState({})
    
    const handleUpdate = () => {
        dispatch(updateStudentAction(edit))
        console.log(edit);
    };

    useEffect(() => {
        dispatch(getStudentAction())
        dispatch(showGroupAction())
    }, [])
    console.log(groups);

    return <div>
        <h1>Students </h1>
        <div className="row">
            <table className="table table-bordered table-dark" style={{width:"70%"}}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>surname</th>
                        <th>group</th>
                        <th>teacher</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(elem => {
                            return elem.id != edit.id
                                ?
                                <tr>
                                    <td>{elem.id}</td>
                                    <td>{elem.name}</td>
                                    <td>{elem.surname}</td>
                                    <td>{elem.group?.name}</td>
                                    <td>{elem.group?.teacher.name} {elem.group?.teacher.surname}</td>
                                    <td>
                                        <button onClick={() => setEdit({...elem,group:elem.group?.id})} className="btn btn-warning">edit</button>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td>{elem.id}</td>
                                <td>
                                        <input
                                            value={edit.name}
                                            onChange={e=>setEdit({...edit,name:e.target.value})}
                                        />
                                </td>
                                <td>
                                        <input
                                            value={edit.surname}
                                            onChange={e=>setEdit({...edit,surname:e.target.value})}
                                        />
                                </td>
                                <td>
                                        <select value={edit.group} onChange={e=>setEdit({...edit,group:e.target.value})}>
                                            <option value="" key=""></option>
                                            <option value="-1" >NO GROUP</option>
                                            {
                                                groups.map(group => {
                                                    return <option value={group.id} key={group.id}>
                                                        {group.name}
                                                    </option>
                                                })
                                            }
                                        </select>
                                </td>
                                <td>
                                    
                                </td>
                                    <td>
                                        <button className="btn btn-success" onClick={handleUpdate}>save</button>
                                </td>
                            </tr>
                        })
                    }
                
                </tbody>
            </table>

        </div>
    </div>
}

export default Students