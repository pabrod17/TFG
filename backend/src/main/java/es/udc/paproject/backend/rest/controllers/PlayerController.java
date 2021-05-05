package es.udc.paproject.backend.rest.controllers;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.IncorrectPositionException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.dtos.PlayerDto;
import static es.udc.paproject.backend.rest.dtos.PlayerConversor.toPlayerDto;
import static es.udc.paproject.backend.rest.dtos.PlayerConversor.toPlayerDtos;

@RestController
@RequestMapping("/players")
public class PlayerController {
    
    private final static String NOT_FOUND_EXCEPTION = "project.exceptions.InstanceNotFoundException";
	private final static String INCORRECT_POSITION_EXCEPTION = "project.exceptions.IncorrectPositionException";
    private final static String INCORRECT_DNI_EXCEPTION = "project.exceptions.IncorrectDniException";
	private final static String INCORRECT_EMAIL_EXCEPTION = "project.exceptions.IncorrectEmailException";
	private final static String INCORRECT_PHONE_NUMBER_EXCEPTION = "project.exceptions.IncorrectPhoneNumberException";


    @Autowired
    private PlayerService playerService;

    @Autowired
	private MessageSource messageSource;

    @ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleNotFoundException(InstanceNotFoundException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(NOT_FOUND_EXCEPTION, null,
        NOT_FOUND_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectPositionException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectPositionException(IncorrectPositionException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_POSITION_EXCEPTION, null,
        INCORRECT_POSITION_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectDniException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectDniException(IncorrectDniException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_DNI_EXCEPTION, null,
        INCORRECT_DNI_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectEmailException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectEmailException(IncorrectEmailException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_EMAIL_EXCEPTION, null,
        INCORRECT_EMAIL_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(IncorrectPhoneNumberException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleIncorrectPhoneNumberException(IncorrectPhoneNumberException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_PHONE_NUMBER_EXCEPTION, null,
        INCORRECT_PHONE_NUMBER_EXCEPTION, locale);

		return new ErrorsDto(errorMessage);
	}

    @GetMapping("/{playerId}/player")
    public PlayerDto findPlayerByIdOfTeam(@PathVariable Long playerId, @RequestAttribute Long teamId)
            throws InstanceNotFoundException {
        return toPlayerDto(playerService.findPlayerByIdOfTeam(playerId, teamId));
    }

    @GetMapping("/{teamId}/dni")
    public PlayerDto findPlayerByDniOfTeam(@PathVariable Long teamId, @RequestAttribute String dni)
            throws InstanceNotFoundException, IncorrectDniException {
        return toPlayerDto(playerService.findPlayerByDniOfTeam(teamId, dni));
    }

    @GetMapping("/{teamId}/name")
    public List<PlayerDto> findPlayersByCompletedNameOfTeam(@PathVariable Long teamId, @RequestAttribute String name, @RequestAttribute String primaryLastName, @RequestAttribute String secondLastName)
            throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersByCompletedNameOfTeam(teamId, name, primaryLastName, secondLastName));
    }

    @GetMapping("/{teamId}")
    public List<PlayerDto> findAPlayersOfTeam(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findAPlayersOfTeam(teamId));
    }

    @GetMapping("/{teamId}/lesion")
    public List<PlayerDto> findPlayersrWithLesionOfTeam(@PathVariable Long teamId) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersrWithLesionOfTeam(teamId));
    }

    @GetMapping("/{teamId}/typeLesion")
    public List<PlayerDto> findPlayersWithOneTypeLesion(@PathVariable Long teamId, @RequestAttribute String typeLesion) throws InstanceNotFoundException {
        return toPlayerDtos(playerService.findPlayersWithOneTypeLesion(typeLesion, teamId));
    }

    @PostMapping("")
    public PlayerDto addPlayer(@RequestAttribute Long teamId, @RequestAttribute String playerName, @RequestAttribute String primaryLastName, @RequestAttribute String secondLastName,
    @RequestAttribute String position, @RequestAttribute String trends, @RequestAttribute String phoneNumber, @RequestAttribute String email, @RequestAttribute String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {
        return toPlayerDto(playerService.addPlayer(teamId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni));
    }

    @PostMapping("/{teamId}/changePlayerToTeam")
    public void changePlayerToTeam(@PathVariable Long teamId, @RequestAttribute Long playerId)
            throws InstanceNotFoundException {
        playerService.changePlayerToTeam(playerId, teamId);
    }
    
    @PutMapping("/{playerId}")
    public PlayerDto updatePlayer(@RequestAttribute Long teamId, @PathVariable Long playerId, @RequestAttribute String playerName, @RequestAttribute String primaryLastName, @RequestAttribute String secondLastName,
    @RequestAttribute String position, @RequestAttribute String trends, @RequestAttribute String phoneNumber, @RequestAttribute String email, @RequestAttribute String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {
        return toPlayerDto(playerService.updatePlayer(teamId, playerId, playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email, dni));
    }

    @DeleteMapping("/{playerId}")
    public void removePlayer(@RequestAttribute Long teamId, @PathVariable Long playerId)
            throws InstanceNotFoundException {
        playerService.removePlayer(teamId, playerId);
    }
    
}