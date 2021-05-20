import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';

const LesionView = () => {

    const lesion = useSelector(selectors.getOneLesion);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    function LesionViewFunction({lesion, dispatch}){
        if(lesion){

            return (
                    

                    <div class="card hola  text-center" >
                        <img className="holas" src={lesionPierna}/>
                        <div class="card-body">
                            <h5 class="card__name">{lesion.lesionName}</h5>
                            <h5 class="card-title">Type: {lesion.lesionType}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Description</h5>
                            <p class="card-text">{lesion.description}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Medication</h5>
                            <p class="card-text">{lesion.medication}</p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">

                        </div>
                    </div>



            );


        }
        else{
            dispatch(actions.findLesionById(id, () => history.push(`/lesion/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <LesionViewFunction lesion={lesion} dispatch={dispatch}/>
        </div>
    );
}

export default LesionView;