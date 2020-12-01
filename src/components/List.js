function List(props) {
    return(
        <div className="list">
            <img src={props.image} alt="profile image"/>
            <div className="listInfo">
                <div className="listName">{props.name}</div>
                <div className="listState">{props.state}</div>
            </div>
        </div>
    )
}

export default List;