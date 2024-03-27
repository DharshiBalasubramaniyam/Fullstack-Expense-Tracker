function ProfileCard({username, email}) {
    return (
        <div className='profile' style={{maxWidth: '400px', flexDirection: 'column', justifyContent: 'çenter', padding: '25px'}}>
            <i class='fa fa-user-circle-o' aria-hidden='true'></i>
            <div style={{alignItems: 'center'}}>
                <p>{username}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default ProfileCard