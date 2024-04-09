import './Menu.css'
import { PiHeartStraightLight } from "react-icons/pi"; //빈하트
import { PiHeartStraightFill } from "react-icons/pi"; //채운하트

function Menu(props){
    return <div className="menu">
                <div>작성자 : {props.userid}</div>
                <div className="menu-title">{props.title}</div>
                <img src={`http://localhost:4000/img/${props.fileName}`}></img>
                <div className="menu-content">{props.content}</div>
                <PiHeartStraightLight />< PiHeartStraightFill style={{ color: 'red' }}/>

            </div>
}

export default Menu;