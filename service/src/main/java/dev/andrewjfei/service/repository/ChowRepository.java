package dev.andrewjfei.service.repository;

import dev.andrewjfei.service.dao.ChowDAO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChowRepository extends CrudRepository<ChowDAO, String> {

    @Query("SELECT * FROM chow WHERE user_id = :userId ORDER BY created DESC")
    public List<ChowDAO> retrieveChowListByUserId(@Param("userId") String userId);

}
