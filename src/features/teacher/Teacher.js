import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useOutletContext } from "react-router-dom"
import { getStudentAction, getTeacherAction, showGroupAction, showUserAction } from "../admin/Users/Users.slice"

const Teacher = () => {
    const  account = useOutletContext()
    console.log(account);
    const allGroups = useSelector(state => state.groups.groups)
    console.log(allGroups);

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(showUserAction())
        dispatch(showGroupAction())
        dispatch(getTeacherAction())
        dispatch(getStudentAction())
    }, [])

   
    return <div>
        <div>
            <h1>Teacher {account.name} {account.surname}</h1>
            <table className="table table-bordered table-dark" style={{width:1000}}>
                <thead>
                    <tr>
                        <th>g. name</th>
                        <th>students</th>
                        <th>schedule</th>
                        <th>hours</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        account.groups.map((elem,i)=>{
                            const foundGroup = allGroups?.find(grup => grup.id == elem)
                            
                            return foundGroup && <tr key={i}>
                                <td>{foundGroup.name}</td>
                                <td>{foundGroup.students.map(stud=><div key={stud.id}>{stud.name} {stud.surname}</div> )}</td>
                                <td>
                                    {
                                        foundGroup.schedule == "v1" ?
                                            "Monday,Wednesday,Friday" 
                                            :
                                            "Tuesday,Thursday,Saturday"
                                    }
                                </td>
                                <td>
                                    {
                                        foundGroup.hours == 'vi' ?
                                        '10:00-12:00' : foundGroup.hours == 'v2' ?
                                            '12:00-14:00' : foundGroup.hours == 'v3' ?
                                                '14:00-16:00' : foundGroup.hours == 'v4' ?
                                                    '16:00-18:00' : '18:00-20:00'
                                    }
                                </td>
                                <td>{}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default Teacher