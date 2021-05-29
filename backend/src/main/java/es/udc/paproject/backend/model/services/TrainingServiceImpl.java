package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.annotation.JsonAppend.Attr;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.PlayerTraining;
import es.udc.paproject.backend.model.entities.PlayerTrainingDao;
import es.udc.paproject.backend.model.entities.SeasonDao;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.TeamDao;
import es.udc.paproject.backend.model.entities.Training;
import es.udc.paproject.backend.model.entities.TrainingDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

@Service
@Transactional
public class TrainingServiceImpl implements TrainingService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private TrainingDao trainingDao;

    @Autowired
    private PlayerDao playerDao;

    @Autowired
    private PlayerTrainingDao playerTrainingDao;

    @Autowired
    private SeasonDao seasonDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;
    
    @Override
    public Training addTraining(Long teamId, Long seasonId, LocalDateTime trainingDate, Integer durationMinutes,
            String description, String objective) throws InstanceNotFoundException {

                if(teamId != null){
                    if (!teamDao.existsById(teamId)) {
                        throw new InstanceNotFoundException("project.entities.team");
                    }
                }
                if(seasonId != null){
                    if (!seasonDao.existsById(seasonId)) {
                        throw new InstanceNotFoundException("project.entities.season");
                    }
                }
                List<SeasonTeam> seasonTeams = new ArrayList<>();
                if(teamId != null){
                    if(seasonId != null){
                        seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonIdAndTeamId(seasonId, teamId);
                    } else{
                        seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);
                    }
                } else{
                    seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);

                }

                Training training = new Training(trainingDate, durationMinutes, description, objective, seasonTeams.get(0));
                trainingDao.save(training);
        return training;
    }

    @Override
    public void addPlayerToTraining(Long trainingId, Long playerId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        
        Training training = trainingDao.findById(trainingId).get();
        Player player = playerDao.findById(playerId).get();

        PlayerTraining playerTraining =  new PlayerTraining(player, training);

        playerTrainingDao.save(playerTraining);
    }

    @Override
    public Training findTrainingById(Long trainingId) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.training");
        }
        Training training = trainingDao.findById(trainingId).get();

        return training;
    }

    @Override
    public List<Training> findTrainingsByTwoDatesAndTeamIdOrSeasonId(Long teamId, Long seasonId,LocalDateTime startDate,
            LocalDateTime endDate) throws StartDateAfterEndDateException, InstanceNotFoundException {

            if(startDate.isAfter(endDate)){
                throw new StartDateAfterEndDateException(startDate, endDate);
            }
            List<SeasonTeam> seasonTeams = new ArrayList<>();

            List<Training> trainings = new ArrayList<>();
            List<Training> trainings2 = new ArrayList<>();

            List<Training> trainingsBySeasonTeamId = new ArrayList<>();


            if(teamId != null){
                if(seasonId != null){
                    seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonIdAndTeamId(seasonId, teamId);
                    for(SeasonTeam seasonTeam : seasonTeams){
                            trainings2 = trainingDao.findBySeasonTeamId(seasonTeam.getId());
                            for(Training training : trainings2){
                                trainingsBySeasonTeamId.add(training);
                            }
                    }
                } else{
                    seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);
                    for(SeasonTeam seasonTeam : seasonTeams){
                            trainings2 = trainingDao.findBySeasonTeamId(seasonTeam.getId());
                            for(Training training : trainings2){
                                trainingsBySeasonTeamId.add(training);
                            }
                    }
                }
            } else{
                seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);
                for(SeasonTeam seasonTeam : seasonTeams){
                        trainings2 = trainingDao.findBySeasonTeamId(seasonTeam.getId());
                        for(Training training : trainings2){
                            trainingsBySeasonTeamId.add(training);
                        }
                }
            }

            for (Training training : trainingsBySeasonTeamId) {
                if(training.getTrainingDate().isAfter(startDate) && training.getTrainingDate().isBefore(endDate)) {
                    trainings.add(training);
                }
            }

            if (trainings.isEmpty()) {
                throw new InstanceNotFoundException("project.entities.training");
            }

            trainings = trainings.stream().distinct().collect(Collectors.toList());
            return trainings;
    }

    @Override
    public List<Training> findTrainingsByTeamId(Long teamId) throws InstanceNotFoundException {

            if (!teamDao.existsById(teamId)) {
                throw new InstanceNotFoundException("project.entities.team");
            }

            List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);

            List<Training> trainings = new ArrayList<>();
            List<Training> trainings2 = new ArrayList<>();

            for(SeasonTeam seasonTeam : seasonTeams){
                trainings2 = trainingDao.findBySeasonTeamId(seasonTeam.getId());
                for(Training training : trainings2){
                    trainings.add(training);
                }
            }

            if (trainings.isEmpty()) {
                throw new InstanceNotFoundException("project.entities.training");
            }

            trainings = trainings.stream().distinct().collect(Collectors.toList());
            return trainings;
    }

    @Override
    public List<Training> findTrainingsBySeasonId(Long seasonId) throws InstanceNotFoundException {


        if (!seasonDao.existsById(seasonId)) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);
        List<Training> trainings = new ArrayList<>();
        List<Training> trainings2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            trainings2 = trainingDao.findBySeasonTeamId(seasonTeam.getId());
            for(Training training : trainings2){
                trainings.add(training);
            }
        }

        if (trainings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.training");
        }

        trainings = trainings.stream().distinct().collect(Collectors.toList());
        return trainings;
    }

    @Override
    public List<Training> findTrainingsByTeamIdAndSeasonId(Long teamId, Long seasonId)
            throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!seasonDao.existsById(seasonId)) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonIdAndTeamId(seasonId, teamId);
        List<Training> trainings = new ArrayList<>();
        List<Training> trainings2 = new ArrayList<>();

        for(SeasonTeam seasonTeam : seasonTeams){
            trainings2 = trainingDao.findBySeasonTeamId(seasonTeam.getId());
            for(Training training : trainings2){
                trainings.add(training);
            }
        }

        if (trainings.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.training");
        }

        trainings = trainings.stream().distinct().collect(Collectors.toList());
        return trainings;
    }

    @Override
    public void removeTraining(Long trainingId) throws InstanceNotFoundException {
        
        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        Training training = trainingDao.findById(trainingId).get();
        trainingDao.delete(training);
    }

    @Override
    public Training updateTraining(Long trainingId, LocalDateTime trainingDate, Integer durationMinutes, String description,
            String objective) throws InstanceNotFoundException {

        if (!trainingDao.existsById(trainingId)) {
            throw new InstanceNotFoundException("project.entities.season");
        }
        Training training = trainingDao.findById(trainingId).get();

        if(trainingDate != null)
            training.setTrainingDate(trainingDate);
         if(durationMinutes != null)
            training.setDurationMinutes(durationMinutes);
        if(description != null)
            training.setDescription(description);
        if(objective != null)
            training.setObjective(objective);

        
        trainingDao.save(training);

        return training;
    }
}