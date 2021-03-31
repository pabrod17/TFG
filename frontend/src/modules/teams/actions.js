import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findAllTeamsCompleted = teams => ({
    type: actionTypes.FIND_ALL_TEAMS_COMPLETED,
    teams
});

export const findAllTeams = () => dispatch => {
    backend.teamService.findAllTeams(
        teams => dispatch(findAllTeamsCompleted(teams))
    );
}

const findTeamtByIdCompleted = team => ({
    type: actionTypes.FIND_TEAM_BY_ID_COMPLETED,
    team
});

export const findTeamById = (id, onSuccess) => dispatch => {
    backend.teamService.findTeamById(id,
        team => {dispatch(findTeamtByIdCompleted(team));
        onSuccess();
        }
    );
}


const findTeamtByNameCompleted = team => ({
    type: actionTypes.FIND_TEAM_BY_NAME_COMPLETED,
    team
});

export const findTeamByName = teamName => dispatch => {
    backend.teamService.findTeamByName(teamName,
        team => dispatch(findTeamtByNameCompleted(team)));
}

const updateTeamCompleted = team => ({
    type: actionTypes.UPDATE_TEAM_COMPLETED,
    team
});

export const updateTeam =  (team, onSuccess, onErrors) => dispatch =>{
    backend.teamService.updateTeam(team,
        team => {
            dispatch(updateTeamCompleted(team));
            onSuccess();
        },
        onErrors);
}

const addTeamCompleted = team => ({
    type: actionTypes.ADD_TEAM_COMPLETED,
    team
});

export const addTeam =  (team, onSuccess, onErrors) => dispatch =>{
    backend.teamService.addTeam(team,
        team => {
            dispatch(addTeamCompleted(team));
            onSuccess();
        },
        onErrors);
}

export const removeTeam = (id, onSuccess, onErrors) => {
    backend.teamService.removeTeam(id, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_TEAM_COMPLETED};

}

export const addTeamToSeason = (seasonId, teamId, onSuccess, onErrors) => {
    backend.teamService.addTeamToSeason(seasonId, teamId, onSuccess, onErrors);
    return {type: actionTypes.ADD_TEAM_TO_SEASON_COMPLETED};
}

//findTeamsToSeason

