import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteGroupAction, getStudentAction, getTeacherAction, showGroupAction } from "../../features/admin/Users/Users.slice"

const GroupList = () => {
    const items = useSelector(state => state.users.groups)
    console.log(items)

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(showGroupAction())
        dispatch(getTeacherAction())
        dispatch(getStudentAction())
    }, [])

   return <div className="col md-6">
    <div>
        <table className="table table-bordered table-dark">
            <thead>
                <tr>
                    <th> group name</th>
                    <th>teachers</th>
                    <th>students</th>
                    <th>schedule</th>
                    <th>hours</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                items.map(elem=>{
                    return <tr key={elem.id}>
                        <td>{elem.name}</td>
                        <td>{elem.teacher?.name} {elem.teacher?.surname}</td>
                        <td>{elem.students.map(item=><div>{item.name} {item.surname}</div> )}</td>
                        <td>{
                            elem.schedule == "v1" ?
                                "Monday,Wednesday,Friday" 
                                :
                                "Tuesday,Thursday,Saturday"
                        }</td>
                        <td>{
                            elem.hours == 'vi' ?
                                '10:00-12:00' : elem.hours == 'v2' ?
                                    '12:00-14:00' : elem.hours == 'v3' ?
                                        '14:00-16:00' : elem.hours == 'v4' ?
                                            '16:00-18:00' : '18:00-20:00'
                        }</td>
                        <td><button className="btn btn-danger" onClick={()=>dispatch(deleteGroupAction(elem.id))}>Delete</button></td>
                    </tr>
                    })
                }
            </tbody>
        </table>
    </div>
</div>
}

export default GroupList