import './userList.css';
import { Link, useLocation } from "react-router-dom";

function UserList(props){
    return <div className="UserList">
                <Link className="menu-title" to={`Profile/${props.userId}`} >{props.name}</Link>
            </div>
}

export default UserList;