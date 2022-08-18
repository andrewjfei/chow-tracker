package dev.andrewjfei.service.repository;

import dev.andrewjfei.service.dao.UserDao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<UserDao, String> {

    @Query(
            value = "SELECT * FROM \"user\" WHERE \"username\" = :username OR \"email\" = :email",
            nativeQuery = true
    )
    UserDao retrieveUserByUsernameOrEmail(@Param("username") String username, @Param("email") String email);

    @Query(
            value = "SELECT * FROM \"user\" WHERE \"username\" = :username",
            nativeQuery = true
    )
    UserDao retrieveUserByUsername(@Param("username") String username);

    @Query(
            value = "SELECT * FROM \"user\" WHERE \"email\" = :email",
            nativeQuery = true
    )
    UserDao retrieveUserByEmail(@Param("email") String email);

}
