import React, {useEffect, useRef, useState} from 'react';
// import {connect} from 'react-redux';
// import {signUserUp} from '../../actions';
import CenterCard363 from './centerCard363';
import useForm from '../use-form-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { venueAdd, venueGet, venueEdit } from '../actions';

const VenueManage = (props) => {
    const edit_type = props.match.params.edit_type;
    const venue_id = props.match.params.venue_id;

    const fileRef = useRef();
    const [errMsg, setErrorMsg] = useState('');
    const [isFormEnabled, setIsFormEnabled] = useState(true)

    const options = {
        initialValues: {
            'venueName': '',
            'venueLocation': '',
            'venueAddress': '',
            'venueImageFile':'',
            'venueImageData': null,
            'venuePeopleCount': '',
            'VenuePrice': '',
            'venueAvailableFrom':'',
            'venueAvailableTo':'',
        },
        callback: () => {
            console.log(inputs)
            if(edit_type == "add")
            {
                venueAdd(inputs).then( data => {
                    console.log(data);
                    window.location = "/#venue/";
                } )
            }
            if(edit_type == "edit")
            {
                venueEdit({...inputs, venue_id: venue_id }).then(data => {
                    console.log(data);
                    window.location = "/#venue/";
                    
                })
            }
            // if (inputs.password == inputs.password2) {
            //     console.log(inputs);
            //     props.signUserUp(inputs);
            // }else{
            //     setErrorMsg('password does not matched');
            // }
        },
        debug: false
    }

    const { onSubmit, onChange, inputs, dirty, submitting, setInputs } = useForm('AdvanceForm', options);

    useEffect(() => {
        if(edit_type == "edit" || edit_type == 'view'){
            venueGet(venue_id)
                .then( res => {
                    const fixDate = (date) => {
                        const date_parts = date.split('-')
                        return `${date_parts[2]}-${date_parts[1]}-${date_parts[0]}`
                    }
                    fixDate(res.data.venueAvailableFrom)
                    res.data.venueAvailableFrom = fixDate((new Date(res.data.venueAvailableFrom)).toLocaleDateString('en-GB').replaceAll("/","-"))
                    res.data.venueAvailableTo = fixDate((new Date(res.data.venueAvailableTo)).toLocaleDateString('en-GB').replaceAll("/","-"))
                    setInputs({...inputs, ...res.data})
                })
            }
        if( edit_type == 'view')
            setIsFormEnabled(false)
    }, [])

    useEffect(()=>{
        if( inputs.venueAvailableFrom && inputs.venueAvailableTo && !validDate(inputs.venueAvailableFrom, inputs.venueAvailableTo))
        {
            alert("invalid dates")
            setInputs({...inputs, venueAvailableFrom:'', venueAvailableTo:''})
        }
    }, [inputs.venueAvailableFrom, inputs.venueAvailableTo])

    useEffect(()=>{
        const file = fileRef.current.files[0]
        if(!file)
            return
        toBase64(file).then(file_b64=>{
            setInputs({...inputs, venueImageData:file_b64})
        })
    }, [inputs.venueImageFile])

    return (
        <CenterCard363>
            <div class="container">
            <div style={{ backgroundColor:"#FFF0F0", borderRadius:'50px' }} >
            <div class="p-sm-5 p-4">
            <h4 className={`${ !isFormEnabled && 'd-none'}`}>
                {capitalizeFirstLetter(edit_type)} Venue
            </h4>
            <div className="card-body">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Name:</label>
                    <input
                        name="venueName"
                        value={inputs.venueName}
                        type='text'
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        // placeholder="venue Name"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input
                        name="venueLocation"
                        value={inputs.venueLocation}
                        type='text'
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        // placeholder="venueLocation"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div className="form-group">
                    <label>Venue Address:</label>
                    <input
                        name="venueAddress"
                        value={inputs.venueAddress}
                        type='text'
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        // placeholder="venueAddress"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div className="form-group">
                    <label>Image of the Venue:</label>
                    <input
                        ref={fileRef}
                        name="venueImageFile"
                        value={inputs.venueImageFile}
                        type='file'
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        // placeholder="venueImageFile"
                        style={{ backgroundColor:"#D0C5BA" }}/>
                    {inputs.venueImageData && <img src={inputs.venueImageData} width={300} height={300}/>}
                </div>

                <div className="form-group">
                    <label>Capacity:</label>
                    <input
                        name="venuePeopleCount"
                        value={inputs.venuePeopleCount}
                        type='number'
                        min={0}
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        style={{ backgroundColor:"#D0C5BA" }}
                        // placeholder="venuePeopleCount"
                        required/>
                </div>

                <div className="form-group">
                    <label>Venue Price:</label>
                    <input
                        name="venuePrice"
                        value={inputs.venuePrice}
                        type='number'
                        min={0}
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        // placeholder="venuePrice"
                        step='.01'
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div className="form-group">
                    <label>Availability Start Date:</label>
                    <input
                        name="venueAvailableFrom"
                        value={inputs.venueAvailableFrom}
                        type='date'
                        min={0}
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        placeholder="venueAvailableFrom"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div className="form-group">
                    <label>Availability End Date:</label>
                    <input
                        name="venueAvailableTo"
                        value={inputs.venueAvailableTo}
                        type='date'
                        min={0}
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        placeholder="venueAvailableTo"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div style={{'paddingTop': '30px'}} className={` ${ !isFormEnabled && 'd-none'}`}>
                    <button
                        type="submit"
                        className="btn btn-lg btn-light btn-block"
                        disabled={!dirty || submitting || !isFormEnabled}
                        value = "Add Venue"
                        style={{ backgroundColor:'#000000', color:'#ffffff' }}>
                        {capitalizeFirstLetter(edit_type)}
                    </button>
                </div>
            </form>
            </div>
            </div>
            </div>
            </div>
        </CenterCard363>
    );
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const validDate = (date1, date2) => {
    const a = new Date(date1);
    const b = new Date(date2);
    return a <= b;
}

// export default connect(null, {signUserUp})(Signup);
export default VenueManage