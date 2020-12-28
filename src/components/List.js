import basicProfile from '../image/basic_profile.png';

function List(props) {
    return(
        <div className="list">
            <img src={props.state.image ? props.state.image : basicProfile} alt={props.state.name}/>
            <div className="listInfo">
                <div className="listName">{props.state.nickname ? props.state.nickname : props.state.name}</div>
                <div className="listState">{props.state.message}</div>
            </div>
        </div>
    )
}

export default List;