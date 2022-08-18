package dev.andrewjfei.service.dao;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "[user]")
public class UserDao {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "[id]", columnDefinition = "VARCHAR(60)", unique = true, nullable = false)
    private String id;

    @Column(name = "[username]", columnDefinition = "VARCHAR(32)", unique = true, nullable = false)
    private String username;

    @Column(name = "[first_name]", columnDefinition = "VARCHAR(16)", nullable = false)
    private String firstName;

    @Column(name = "[last_name]", columnDefinition = "VARCHAR(16)", nullable = false)
    private String lastName;

    @Column(name = "[email]", columnDefinition = "VARCHAR(64)", unique = true, nullable = false)
    private String email;

    @Column(name = "[password]", columnDefinition = "VARCHAR(255)", nullable = false)
    private String password;

    @Column(name = "[created]", columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime created = LocalDateTime.now();

    public UserDao() {


    }

    public UserDao(String username, String firstName, String lastName, String email, String password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    @Override
    public String toString() {
        return "UserDAO{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", created=" + created +
                '}';
    }
}
