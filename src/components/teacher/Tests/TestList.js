import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom"
import { getTestAction } from "../../../features/teacher/Tests/Test.slice";

const TestList = () => {
    const tests=useSelector(state=>state.tests.tests)
    
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getTestAction())
    },[])

    return <div>
        <h1>TestList</h1>
        <h3>You have a {tests.length} tests</h3>
        {
            tests.map(elem=>{
                return  <NavLink to={`${elem.id}`} className="btn btn-success">{elem.name}</NavLink>
            })
        }
    </div>
}
export default TestList