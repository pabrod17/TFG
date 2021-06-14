import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';

const AddStretching = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [stretchingName, setStretchingName] = useState("");
    const [description, setDescription] = useState("");
    const [stretchingType, setStretchingType] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.addStretching(stretchingName.trim(), 
            description.trim(), stretchingType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history.push('/stretchings/addStretching');
            window.location.reload('true');
        }

        const hamstrings = "Hamstrings";
        const buttocks = "Buttocks";
        const calf = "Calf";
        const adductors = "Adductors";
        const shoulder  = "Shoulder";
        const quadriceps = "Quadriceps";
        const back = "Back";
        const pectoral = "Pectoral";
        const crotch = "Crotch";
        const triceps  = "Triceps";

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                    <FormattedMessage id="project.stretchings.fields.addStretching"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.stretchings.fields.stretchingName"/>
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="stretchingName" className="form-control"
                                        value={stretchingName}
                                        onChange={e => setStretchingName(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.exercises.fields.description"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="description" className="form-control"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            <FormattedMessage id="project.stretchings.fields.stretchingType"/>
                                </label>
                            <div class="dropdown col-md-6">
                                <button class="dropbtn">{stretchingType} 
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-content">
                                <a type="button" onClick={() => setStretchingType(hamstrings)} ><FormattedMessage id="project.stretchings.fields.hamstrings"/></a>
                                <a type="button" onClick={() => setStretchingType(buttocks)} ><FormattedMessage id="project.stretchings.fields.buttocks"/></a>
                                <a type="button" onClick={() => setStretchingType(calf)} ><FormattedMessage id="project.stretchings.fields.calf"/></a>
                                <a type="button" onClick={() => setStretchingType(adductors)} ><FormattedMessage id="project.stretchings.fields.adductors"/></a>
                                <a type="button" onClick={() => setStretchingType(shoulder)} ><FormattedMessage id="project.stretchings.fields.shoulder"/></a>
                                <a type="button" onClick={() => setStretchingType(quadriceps)} ><FormattedMessage id="project.stretchings.fields.quadriceps"/></a>
                                <a type="button" onClick={() => setStretchingType(back)} ><FormattedMessage id="project.stretchings.fields.back"/></a>
                                <a type="button" onClick={() => setStretchingType(pectoral)} ><FormattedMessage id="project.stretchings.fields.pectoral"/></a>
                                <a type="button" onClick={() => setStretchingType(crotch)} ><FormattedMessage id="project.stretchings.fields.crotch"/></a>
                                <a type="button" onClick={() => setStretchingType(triceps)} ><FormattedMessage id="project.stretchings.fields.triceps"/></a>
                                </div>
                            </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-8 col-md-1">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.save"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
}

export default AddStretching;