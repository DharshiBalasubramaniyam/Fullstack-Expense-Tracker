import { memo, useEffect, useState } from "react";

const Message = memo(({ message }) => {

    const [msg, setMessage] = useState(null);

    useEffect(() => {
        if (message) {
            setMessage(message);
        }
    }, [message])


    const closeMsg = () => {
        setMessage(null)
    }


    return (
        <>

            {
                msg &&
                    <div className={msg.status === "SUCCESS" ? 'msg-wrapper success' : 'msg-wrapper fail'}>
                        <p>{msg.text}</p><span onClick={closeMsg}><i class='fa fa-times'></i></span>
                    </div> 
            }
        
        </>
       
    )
})

export default Message;