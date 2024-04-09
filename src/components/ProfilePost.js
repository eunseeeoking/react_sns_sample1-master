import './Menu.css'


function ProfilePost(props){
    return <div className="menu">
                
                    <img src={`http://localhost:4000/img/${props.fileName}`} style={{width : '200px' , height : '200px'}}></img>
                
            </div>
}

export default ProfilePost;