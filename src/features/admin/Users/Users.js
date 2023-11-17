

import UserList from '../../../components/admin/UsersList';
import AddUser from './../../../components/admin/AddUser';

const Users = () => {
    return <div>
        <h1>Users</h1>
        <div className="row">
                <UserList/>
                <AddUser/>           
        </div>
    </div>
}

export default Users