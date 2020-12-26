function List(props) {
    return(
        <div className="list">
            <img src={props.state.image} alt="profile image"/>
            <div className="listInfo">
                <div className="listName">{props.state.name}</div>
                <div className="listState">{props.state.message}</div>
            </div>
        </div>
    )
}

export default List;