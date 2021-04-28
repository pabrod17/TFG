package es.udc.paproject.backend.model.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Player {

    private Long id;
    private String playerName;
    private String primaryLastName;
    private String secondLastName;
    private Position position;
    private String trends;
    private String phoneNumber;
    private String email;
    private String dni;
    private Team team;

    public Player() {
    }
    
    public Player(String playerName, String primaryLastName, String secondLastName, Position position,
            String trends, String phoneNumber, String email, String dni, Team team) {
        this.playerName = playerName;
        this.primaryLastName = primaryLastName;
        this.secondLastName = secondLastName;
        this.position = position;
        this.trends = trends;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dni = dni;
        this.team = team;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPrimaryLastName() {
        return primaryLastName;
    }

    public void setPrimaryLastName(String primaryLastName) {
        this.primaryLastName = primaryLastName;
    }

    public String getSecondLastName() {
        return secondLastName;
    }

    public void setSecondLastName(String secondLastName) {
        this.secondLastName = secondLastName;
    }

    public String getPosition() {
        return position.name();
    }

    public void setPosition(String position) {
        this.position = Position.valueOf(position);
    }

    public String getTrends() {
        return trends;
    }

    public void setTrends(String trends) {
        this.trends = trends;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
	@ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name= "teamId")
    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }
}