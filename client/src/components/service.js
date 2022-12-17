import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { serviceDelete, serviceGetAll } from '../actions';

export default function Service(){
    const [services, setService] = useState([])

    useEffect(()=>{
        serviceGetAll().then( data => setService(data.data))
    }, [])

    const onDelete = (service_id) => {
        serviceDelete(service_id)
            .then( res => {
                const newServices = services.filter( service => service._id != service_id)
                setService(newServices)
            })
    }

    return(
        <div className='container mt-sm-5 p-sm-5 mt-4 p-4 mb-4 mb-sm-5' style={{ backgroundColor:"#FFF0F0",borderRadius:'50px' }}>
            <h4 className='text-center'>Service Provider Dashboard</h4>
            <Link className="btn btn-success mb-3" to="/service/add">
                Add Service
            </Link>
            <table className="table" style={{ borderRadius:'20px', overflow:'hidden' }}>
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">ServiceId</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        services.map( service => 
                        <tr key={service._id}>
                            <th scope="row">{service._id}</th>
                            <td>{service.venueServiceName}</td>
                            <td>{service.servicePrice + " CAD"}</td>
                            <td> <Link className='btn btn-primary' to={`/service/view/${service._id}`}>View</Link> </td>
                            <td> <Link className='btn btn-primary' to={`/service/edit/${service._id}`}>Edit</Link> </td>
                            <td> <a className='btn btn-danger' onClick={() => onDelete(service._id)}>Delete</a> </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}