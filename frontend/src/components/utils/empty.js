function Empty({ message }) {
    return (
        <div style={{ width: '100%', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>{message ? <>{message}</> : "No data to display!"} </p>
        </div>
    )
}

export default Empty