import './Notification.css'

import { useEffect } from "react"

interface NotificationProps {
    shouldNotify: boolean
    setShouldNotify: Function
    text: string
}


function Notification(props: NotificationProps) {
    useEffect(() => {
        if (props.shouldNotify) {
            setTimeout(() => {
                props.setShouldNotify(false)
            }, 1000);
        }
    }, [props.shouldNotify])
    return (
        <>
            <div className='notificationCont'>
                <div className="notification" style={{ top: `${props.shouldNotify ? '0' : '-50%'}` }}>{props.text + ' '}</div>
            </div>
        </>
    )
}

export default Notification