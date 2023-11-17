import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useOutletContext } from "react-router-dom"
import { getTestAction } from "../../teacher/Tests/Test.slice";

const Tests = () => {
    const  account = useOutletContext()
    const tests=useSelector(state=>state.tests.tests)
    
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getTestAction())
    },[])

    return <div>
        <h1>Student {account.name} {account.surname} </h1>
        <h3>You have a {tests.length} tests</h3>
        {
            tests.map(elem=>{
                return  <NavLink to={`${elem.id}`} className="btn btn-success">{elem.name}</NavLink>
            })
        }
    </div>
}

export default Tests