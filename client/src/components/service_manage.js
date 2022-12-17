import React, {useEffect, useRef, useState} from 'react';
import { serviceAdd, serviceEdit, serviceGet, venueGet } from '../actions';
import useForm from '../use-form-react';
import CenterCard363 from './centerCard363';

export default function ServiceManage(props) {

    const edit_type = props.match.params.edit_type;
    const service_id = props.match.params.service_id;

    const [isFormEnabled, setIsFormEnabled] = useState(true)
    const options = {
        initialValues: {
            'venueServiceName': '',
            'servicePrice':'',
        },
        callback: () => {
            console.log(inputs)
            if( edit_type == "add")
                serviceAdd(inputs)
                .then( data => console.log(data))
                .then(goBack)
            if(edit_type == "edit")
                serviceEdit({service_id:service_id, ...inputs})
                    .then( data => console.log(data))
                    .then(goBack)

        },
        debug: false
    }
    const goBack = () => { window.location = "/#service"}
    useEffect(() => {
        if( edit_type == "edit" || edit_type == "view"){
            serviceGet(service_id)
                .then(data => setInputs(data.data))
        }
        if ( edit_type == "view") setIsFormEnabled(false);
    }, [])
    const { onSubmit, onChange, inputs, dirty, submitting, setInputs } = useForm('AdvanceForm', options);

    return(
    <CenterCard363>
            <div class="container">
            <div style={{ backgroundColor:"#FFF0F0", borderRadius:'50px' }} >
            <div class="p-sm-5 p-4">
            <h4 className={`${ !isFormEnabled && 'd-none'}`}>
                {capitalizeFirstLetter(edit_type)} Service
            </h4>
            <div className="card-body">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Service Name:</label>
                    <input
                        name="venueServiceName"
                        value={inputs.venueServiceName}
                        type='text'
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        placeholder="venueServiceName"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div className="form-group">
                    <label>Service Price:</label>
                    <input
                        name="servicePrice"
                        value={inputs.servicePrice}
                        type='number'
                        onChange={onChange}
                        disabled={!isFormEnabled}
                        className="form-control form-control-lg"
                        placeholder="Service Price"
                        step=".01"
                        required
                        style={{ backgroundColor:"#D0C5BA" }}/>
                </div>

                <div style={{'paddingTop': '30px'}} className={` ${ !isFormEnabled && 'd-none'}`}>
                    <button
                        type="submit"
                        className="btn btn-lg btn-light btn-block"
                        disabled={!dirty || submitting }
                        style={{ backgroundColor:'#000000' , color:'#ffffff'}}>
                        {capitalizeFirstLetter(edit_type)}
                    </button>
                </div>
            </form>
            </div>
            </div>
            </div>
            </div>
        </CenterCard363>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}