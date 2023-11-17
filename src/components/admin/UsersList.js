import { useDispatch, useSelector } from "react-redux"
import { deleteUserAction, showUserAction} from "../../features/admin/Users/Users.slice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const UserList = () => {
    const items=useSelector(state=>state.users.items)

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(showUserAction())
    }, [])

   return <div className="col md-6">
        <div>
    <table className="table table-bordered table-dark">
   <thead>
       <tr>
           <th>name</th>
           <th>login</th>
           <th>type</th>
           <th>actions</th>
       </tr>
   </thead>
   <tbody>
      {
        items.map(elem=>{
            return <tr key={elem.id}>
                <td>{elem.name} {elem.surname}</td>
                <td>{elem.login}</td>
                <td>{elem.type}</td>
                <td><button className="btn btn-danger" onClick={()=>dispatch(deleteUserAction(elem.id))}>Delete</button></td>
            </tr>
        })
      }
   </tbody>
</table>
</div>
<Outlet context={items}/>
</div>
}
export default UserList