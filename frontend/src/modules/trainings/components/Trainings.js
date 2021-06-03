import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import {FormattedDate} from 'react-intl';
import * as actionsPlayers from '../../players/actions';
import * as selectorsPlayers from '../../players/selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import bigBall from '../../trainings/components/bigBall.jpg';

const handleViewTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history.push(`/trainings/view/${id}`)));
}

const handleRemoveTraining = (id, dispatch, history) => {
    dispatch(actions.removeTraining(id, () => history.push(`/trainings/home`)));
    window.location.reload('true');
}

const handleUpdateTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history.push(`/trainings/update/${id}`)));
}

const handleFindPlayersByTraining = (trainingId, id, dispatch, history) => {
  dispatch(actions.findTrainingById(trainingId, () => console.log(trainingId)));
  dispatch(actionsPlayers.findPlayersByTraining(trainingId, () => history.push(`/players/home/training/${id}${trainingId}`)));
}

function TrainingsList({ items, teamId, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findTrainingsByUserId(() => history.push('/trainings/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={bigBall} alt="Person" class="card__image entreno"></img>
                <p class="card__name">{item.objective}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.trainingDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewTraining(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>

                {/* <div class="dropdown">
                <button class="btn-player draw-border">Change Team</button>
                            <div class="dropdown-content">
                            {playersList.map(team => 
                                        <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div> */}

                <button class="btn-player draw-border" type="button" onClick={() => handleFindPlayersByTraining(item.id, teamId,dispatch, history)}>Players</button>
              </div>
            </div>
          </div>;
        });
      }
}

function TrainingsListUser({ items, fallback, dispatch, history}) {
  if (!items || items.length === 0) {
      dispatch(actions.findTrainingsByUserId(() => history.push('/trainings/home')));
      return fallback;
  } else {
      return items.map(item => {
        return <div className="images-teams" key={item.id}>
          
          <div class="">
            <div class="card hola pruebo">
              <img src={bigBall} alt="Person" class="card__image entreno"></img>
              <p class="card__name">{item.objective}</p>
              <p class="card__name">                
              <FormattedDate
                  value={ item.trainingDate }
                  year="numeric"
                  month="long"
                  day="numeric"
              /> 
              </p>
              <div class="grid-container">
              </div>
              <ul class="social-icons lesiongrande">
              <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                <i class="fa fa-trash"></i></a></li>
                
                <li><a type="button" onClick={() => handleViewTraining(item.id, dispatch, history)}>
                  <i class="fa fa-address-book"></i></a></li>
                  <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                  <i class="fa fa-wrench"></i></a></li>
                <li><a href="#"><i class="fa fa-codepen"></i></a></li>
              </ul>

              {/* <div class="dropdown">
              <button class="btn-player draw-border">Change Team</button>
                          <div class="dropdown-content">
                          {playersList.map(team => 
                                      <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                          {team.id} : {"  "}{team.teamName}
                                      </a>)}
                          </div>
              </div> */}

            </div>
          </div>
        </div>;
      });
    }
}


const Trainings = ({trainings}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const team = useSelector(selectorsTeams.getTeam);
    // const players = useSelector(selectorsPlayers.getAllPlayers);
    // const id = teams.team.id;
    // const playersList = players.players;

    // if(!playersList) {
    //     dispatch(actionsPlayers.findAPlayersOfTeam(id, () => history.push(`/players/home/${id}`)));
    //     return "Loading...";
    // }
    if (!team) {
      return(
        <div className="card-group">
        <TrainingsListUser items={trainings} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    );
  } else {
      return(
          <div className="card-group">
          <TrainingsList items={trainings}  teamId={team.id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
          </div>
      );
  };
}
Trainings.propTypes = {
    trainings: PropTypes.array
};

export default Trainings;