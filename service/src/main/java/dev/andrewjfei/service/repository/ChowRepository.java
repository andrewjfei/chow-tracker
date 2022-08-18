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
            value = "SELECT \"cuisine\" as \"item_name\", SUM(\"has_been\") as \"has_been\" " +
                    "FROM \"chow\" WHERE \"user_id\" = :userId GROUP BY \"cuisine\" ORDER BY \"has_been\" " +
                    "DESC LIMIT :limit",
            nativeQuery = true
    )
    List<ChowDao> retrieveChowListByCuisineRanking(@Param("userId") String userId, @Param("limit") int limit);

    @Query(
            value = "SELECT \"price_range\" as \"item_name\", SUM(\"has_been\") as \"has_been\" " +
                    "FROM \"chow\" WHERE \"user_id\" = :userId GROUP BY \"price_range\" ORDER BY \"has_been\" " +
                    "DESC LIMIT :limit",
            nativeQuery = true
    )
    List<ChowDao> retrieveChowListByPriceRangeRanking(@Param("userId") String userId, @Param("limit") int limit);

    @Query(
            value = "SELECT \"area\" as \"item_name\", SUM(\"has_been\") as \"has_been\" " +
                    "FROM \"chow\" WHERE \"user_id\" = :userId GROUP BY \"area\" ORDER BY \"has_been\" " +
                    "DESC LIMIT :limit",
            nativeQuery = true
    )
    List<ChowDao> retrieveChowListByAreaRanking(@Param("userId") String userId, @Param("limit") int limit);

}