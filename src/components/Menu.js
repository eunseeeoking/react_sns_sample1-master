import './Menu.css'
import { PiHeartStraightLight } from "react-icons/pi"; //빈하트
import { PiHeartStraightFill } from "react-icons/pi"; //채운하트

function Menu(props){
    return <div className="menu">
                <div>작성자 : {props.userid}</div>
                <div className="menu-title">{props.title}</div>
                <div className="menu-content">{props.content}</div>
                <PiHeartStraightLight/>< PiHeartStraightFill/>

            </div>
}

export default Menu;