import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import GroupList from '../../../components/admin/GroupList'
import AddGroup from '../../../components/admin/AddGroup'

const Groups = () => {

    return <div >
        <div className='row'>
            <h1>Groups</h1>
            <GroupList/>
            <AddGroup/>
        </div>
    </div>
}

export default Groups