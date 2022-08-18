package dev.andrewjfei.service.repository;

import dev.andrewjfei.service.dao.ChowDao;
import dev.andrewjfei.service.dao.RankingItemDao;
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

    @Query(
            value = "SELECT \"name\" as \"itemName\", \"has_been\" as \"hasBeen\" FROM \"chow\" " +
                    "WHERE \"user_id\" = :userId ORDER BY \"has_been\" DESC LIMIT :limit",
            nativeQuery = true
    )
    List<RankingItemDao> retrieveChowListByPopularityRanking(@Param("userId") String userId, @Param("limit") int limit);

    @Query(
            value = "SELECT \"cuisine\" as \"itemName\", SUM(\"has_been\") as \"hasBeen\" " +
                    "FROM \"chow\" WHERE \"user_id\" = :userId GROUP BY \"cuisine\" ORDER BY \"hasBeen\" " +
                    "DESC LIMIT :limit",
            nativeQuery = true
    )
    List<RankingItemDao> retrieveChowListByCuisineRanking(@Param("userId") String userId, @Param("limit") int limit);

    @Query(
            value = "SELECT \"price_range\" as \"itemName\", SUM(\"has_been\") as \"hasBeen\" " +
                    "FROM \"chow\" WHERE \"user_id\" = :userId GROUP BY \"price_range\" ORDER BY \"hasBeen\" " +
                    "DESC LIMIT :limit",
            nativeQuery = true
    )
    List<RankingItemDao> retrieveChowListByPriceRangeRanking(@Param("userId") String userId, @Param("limit") int limit);

    @Query(
            value = "SELECT \"area\" as \"itemName\", SUM(\"has_been\") as \"hasBeen\" " +
                    "FROM \"chow\" WHERE \"user_id\" = :userId GROUP BY \"area\" ORDER BY \"hasBeen\" " +
                    "DESC LIMIT :limit",
            nativeQuery = true
    )
    List<RankingItemDao> retrieveChowListByAreaRanking(@Param("userId") String userId, @Param("limit") int limit);

}
