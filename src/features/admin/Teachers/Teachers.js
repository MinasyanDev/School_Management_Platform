import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeGroupTeacherAction, getTeacherAction } from "../Users/Users.slice"

const Teachers = () => {
    const items=useSelector(state=>state.users.teachers)
    
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getTeacherAction())
    }, [])
   
    return <div className="row">
        <h1>Teachers</h1>
        <table className="table table-dark table-bordered" style={{width:"70%"}}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>groups</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(elem=>{
                        return <tr key={elem.id}>
                            <td>{elem.id}</td>
                            <td>{elem.name}</td>
                            <td>{elem.surname}</td>
                            <td>{
                                elem.groups && (
                                <ul>
                                  {elem.groups.map((group) => (
                                    <li key={group.id}>{group.name}</li>
                                  ))}
                                </ul>
                                )
                                }
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={()=>dispatch(changeGroupTeacherAction())}>Edit</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default Teachers