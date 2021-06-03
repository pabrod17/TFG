import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import bigBall from '../../trainings/components/bigBall.jpg';

const TrainingView = () => {

    const training = useSelector(selectors.getOneTraining);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    function TrainingViewFunction({training, dispatch}){
        if(training){

            return (
                    

                    <div class="card hola  text-center" >
                        <img className="holas entreno" src={bigBall}/>
                        <div class="card-body">
                            <h5 class="card__name">Training</h5>
                            <h5 class="card-title">Duration: {training.setDurationMinutes}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Description</h5>
                            <p class="card-text">{training.description}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Objective</h5>
                            <p class="card-text">{training.objective}</p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">

                        </div>
                    </div>



            );


        }
        else{
            dispatch(actions.findTrainingById(id, () => history.push(`/trainings/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }


    return(
        <div>
            <TrainingViewFunction training={training} dispatch={dispatch}/>
        </div>
    );
}

export default TrainingView;