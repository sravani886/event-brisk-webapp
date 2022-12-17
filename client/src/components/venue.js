import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { venueGetAll, venueDelete } from '../actions';
import tableStyle from '../statics/tablestyle.css'

export default function Venue(){
    const [venues, setVenues] = useState([])

    useEffect(()=>{
        venueGetAll().then( data => setVenues(data.data))
    }, [])

    const onDelete = (venue_id) => {
        venueDelete(venue_id)
            .then( res => {
                const newVenues = venues.filter( venue => venue._id != venue_id)
                setVenues(newVenues)
            })
    }

    return(
        <div className='container mt-sm-5 p-sm-5 mt-4 p-4 mb-4 mb-sm-5' style={{ backgroundColor:"#FFF0F0",borderRadius:'50px' }}>
            <h4 className='text-center'>Admin Dashboard</h4>
            <Link className="btn btn-success mb-3" to="/venue/add">
                Add Venue
            </Link>
            <table className="table" style={{ borderRadius:'20px', overflow:'hidden' }}>
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">VenueID</th>
                    <th scope="col">Venue</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        venues.map( venue => 
                        <tr key={venue._id}>
                            <th scope="row">{venue._id}</th>
                            <td>{venue.venueName}</td>
                            <td>{venue.venueLocation}</td>
                            <td>{venue.venuePrice}</td>
                            <td> <Link className='btn btn-primary' to={`/venue/view/${venue._id}`}>View</Link> </td>
                            <td> <Link className='btn btn-primary' to={`/venue/edit/${venue._id}`}>Edit</Link> </td>
                            <td> <a className='btn btn-danger' onClick={() => onDelete(venue._id)}>Delete</a> </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}