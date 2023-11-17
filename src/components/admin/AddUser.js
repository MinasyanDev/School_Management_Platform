import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addUserAction } from "../../features/admin/Users/Users.slice"

const AddUser = () => {
  const error = useSelector(state => state.users.error)

   const { register, handleSubmit,reset,formState } = useForm()
   const  {errors,isSubmitSuccessful} = formState

   useEffect(()=>{
      if(isSubmitSuccessful){
         reset()
      }
   },[formState])

   const dispatch=useDispatch()

   const handleAdd = data => {
      dispatch(addUserAction(data))
   }

   return <div className="col md-6">
        <div>
      <h1>ADD</h1>
      {/* {error && <p className='text-danger'>{error}</p>} */}
      <form onSubmit={handleSubmit(handleAdd)}>
         <div>
            <label className="form-label">Name</label>
            {errors.name && <p style={{color:'red'}}>Please provide a valid name</p>}
            <input
               style={{width:400}}
               className="form-control"
               {...register("name",{required:true})}
            />
         </div>
         <div>
            <label className="form-label">Surname</label>
            {errors.surname && <p style={{color:'red'}}>Please provide a valid surname</p>}
            <input
               style={{width:400}}
               className="form-control"
               {...register("surname",{required:true})}

            />
         </div>
         <div>
            <label className="form-label">login</label>
            {errors.login && <p style={{color:'red'}}>Please provide a valid login</p>}
            <input
               style={{width:400}}
               className="form-control"
               {...register("login",{required:true})}

            />
         </div>
         <div>
            <label className="form-label">password</label>
            {errors.password && <p style={{color:'red'}}>Please provide a valid password</p>}
            <input
               style={{width:400}}
               type="password"
               className="form-control"
               {...register("password",{required:true})}

            />
         </div>
         <div>
            <label>type</label>
               <select 
                  style={{width:400}}
                  className="form-control" 
                  {...register("type")} >
                  
                  <option >Select Type</option>
                  <option >admin</option>
                  <option >teacher</option>
                  <option >student</option>
               </select>
         </div>
         <br/>
         <div><button className="btn btn-success">Save</button></div>
      </form>
   </div>
   </div>
}
export default AddUser