package dev.andrewjfei.service.repository;

import dev.andrewjfei.service.dao.ChowDao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChowRepository extends CrudRepository<ChowDao, String> {

    @Query(
            value = "SELECT * FROM \"chow\" WHERE \"user_id\" = :userId ORDER BY \"created\" DESC",
            nativeQuery = true
    )
    List<ChowDao> retrieveChowListByUserId(@Param("userId") String userId);

    @Query(
            value = "SELECT * FROM \"chow\" WHERE \"user_id\" = :userId AND \"name\" = :name",
            nativeQuery = true
    )
    ChowDao retrieveChowByUserIdAndName(@Param("userId") String userId, @Param("name") String name);

}
