import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import * as selectors from '../selectors';
import Exercises from './Exercises';
import {Pager} from '../../common';

const ExercisesHomeByType = () => {
    const exercisesSearch = useSelector(selectors.getExercisesSearch);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const {exerciseType} = useParams();

    const tactic = "Tactic";
    const technique = "Technique";
    const physical = "Physical";
    const globalized = "Globalized";
    const specific  = "Specific";
    const psychological = "Psychological";
    const strategy = "Strategy";
    const preMatch = "PreMatch";

    if(!exercisesSearch){
        console.log("HOLA");
        dispatch(actions.findExercisesByTypePage({page: page, exerciseType: exerciseType}));
        return "Loading...";
    } 

    const previousFindExercisesByTypeResultPage = (exerciseType, dispatch) => {
        setPage(page-1);
        dispatch(actions.previousFindExercisesByTypeResultPage(exerciseType, page));
    }

    const nextFindExercisesByTypeResultPage = (exerciseType, dispatch) => {
        setPage(page+1);
        dispatch(actions.nextFindExercisesByTypeResultPage(exerciseType, page));
    }


    const handleSetTypeExercise = (exerciseType, dispatch) => {
        dispatch(actions.findExercisesByTypePage({page: page, exerciseType: exerciseType}));
        history.push(`/exercises/home/type/${exerciseType}`);
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/exercises/addExercise`)}>Add New Exercise</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Type Exercise 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeExercise(tactic, dispatch)}>Tactic</a>
                            <a type="button" onClick={() => handleSetTypeExercise(technique, dispatch)}>Technique</a>
                            <a type="button" onClick={() => handleSetTypeExercise(physical, dispatch)}>Physical</a>
                            <a type="button" onClick={() => handleSetTypeExercise(globalized, dispatch)}>Globalized</a>
                            <a type="button" onClick={() => handleSetTypeExercise(specific, dispatch)}>Specific</a>
                            <a type="button" onClick={() => handleSetTypeExercise(psychological, dispatch)}>Psychological</a>
                            <a type="button" onClick={() => handleSetTypeExercise(strategy, dispatch)}>Strategy</a>
                            <a type="button" onClick={() => handleSetTypeExercise(preMatch, dispatch)}>PreMatch</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Exercises exercises={exercisesSearch.result.items}/>
                <Pager 
                back={{
                    enabled: exercisesSearch.criteria.page >= 1,
                    onClick: () => previousFindExercisesByTypeResultPage(exerciseType, dispatch) }}
                next={{
                    enabled: exercisesSearch.result.existMoreItems,

                    onClick: () => nextFindExercisesByTypeResultPage(exerciseType, dispatch)}}/>
            </div>
        </div>

    );
}

export default ExercisesHomeByType;