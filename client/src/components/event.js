import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { eventDelete, eventGetUser } from '../actions';
import tableStyle from '../statics/tablestyle.css'

export default function Event(){
    const [events, setEvent] = useState([])

    useEffect(()=>{
        eventGetUser().then( data => setEvent(data.data))
    }, [])

    const onDelete = (event_id) => {
        eventDelete(event_id)
            .then( res => {
                const newEvents = events.filter( event => event._id != event_id)
                setEvent(newEvents)
            })
    }

    
    return(
        <div className='container mt-sm-5 p-sm-5 mt-4 p-4 mb-4 mb-sm-5' style={{ backgroundColor:"#FFF0F0", borderRadius:'50px', margin: '0 auto' }}>
            <table className="table mb-3">
                <thead className="thead-dark" >
                    <tr style={{borderRadius:'20px'}}>
                        <th  scope="col">Event Id</th>
                        <th scope="col">Event Type</th>
                        <th scope="col">Event Date</th>
                    </tr>
                </thead>
                <tbody style={{borderRadius:'50px' }}>
                    {
                        events.map( event => 
                        <tr style={{borderRadius:'50px'}} key={event._id}>
                            <th scope="row">{event._id}</th>
                            <td>{event.eventType}</td>
                            <td>{new Date(event.eventDate).toDateString()}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            {/* <Link className="btn btn-success mb-3" to="/event/add">
                Add Event
            </Link> */}
        </div>
    )
}
