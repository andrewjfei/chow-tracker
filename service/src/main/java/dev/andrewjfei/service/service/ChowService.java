package dev.andrewjfei.service.service;

import dev.andrewjfei.service.controller.ChowController;
import dev.andrewjfei.service.dao.ChowDao;
import dev.andrewjfei.service.dao.RankingItemDao;
import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.ChowListFilterDto;
import dev.andrewjfei.service.dto.NewChowDto;
import dev.andrewjfei.service.dto.RankingItemDto;
import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.enumeration.PriceRange;
import dev.andrewjfei.service.exception.ChowTrackerServiceException;
import dev.andrewjfei.service.repository.ChowRepository;
import dev.andrewjfei.service.repository.UserRepository;
import dev.andrewjfei.service.util.MapperUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ChowService {

    @Autowired
    private ChowRepository chowRepository;

    @Autowired
    private UserRepository userRepository;

    private final Logger logger = LoggerFactory.getLogger(ChowService.class);

    /************************************************************************************/
    /*************************************** CRUD ***************************************/
    /************************************************************************************/

    public ChowDto createNewChow(String userId, NewChowDto newChowDto) {
        // Check if chow name already exists in database
        isNameAvailable(userId, newChowDto.name());

        ChowDao chowDao = new ChowDao(
                userId,
                newChowDto.name(),
                newChowDto.cuisine(),
                newChowDto.priceRange(),
                newChowDto.area()
        );

        ChowDao newChowDao = chowRepository.save(chowDao);

        return MapperUtil.toDto(newChowDao);
    }

    public List<ChowDto> retrieveChowListByUserId(
            String userId,
            String searchString,
            List<Cuisine> cuisineList,
            List<PriceRange> priceRangeList,
            List<Area> areaList
    ) {
        logger.info("Inside Service");

        // Check if user id is valid
        if (!userRepository.existsById(userId)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }

        // Get full enum list if filter is empty or null
        cuisineList = getEnumList(cuisineList, Cuisine.class);
        priceRangeList = getEnumList(priceRangeList, PriceRange.class);
        areaList = getEnumList(areaList, Area.class);

        logger.info("Before Repository Retrieve");

        List<ChowDao> chowDaoList = chowRepository.retrieveChowListByUserIdWithFilters(
                userId,
                cuisineList,
                priceRangeList,
                areaList
        );

        logger.info("After Repository Retrieve");

        // Apply search string algorithm if search string filter is applied
        if (searchString != null && !searchString.isBlank()) {
            chowDaoList = filterChowListBySearchString(chowDaoList, searchString);
        }

        logger.info("After String Filter Applied");

        return toDtoList(chowDaoList);
    }

    public ChowDto updateChow(NewChowDto newChowDto, String chowId) {
        Optional<ChowDao> optionalChowDao = chowRepository.findById(chowId);

        // Check if chow id is valid
        if (!optionalChowDao.isPresent()) {
            throw new ChowTrackerServiceException(Error.INVALID_CHOW_ID, HttpStatus.BAD_REQUEST);
        }

        ChowDao chowDao = optionalChowDao.get();

        // Check if chow name already exists in database
        isNameAvailable(chowDao.getUserId(), newChowDto.name());

        chowDao.setName(newChowDto.name());
        chowDao.setCuisine(newChowDto.cuisine());
        chowDao.setPriceRange(newChowDto.priceRange());
        chowDao.setArea(newChowDto.area());

        ChowDao updatedChowDao = chowRepository.save(chowDao);

        return MapperUtil.toDto(updatedChowDao);
    }

    public void deleteChow(String chowId) {
        // Check if chow id is valid
        if (!chowRepository.existsById(chowId)) {
            throw new ChowTrackerServiceException(Error.INVALID_CHOW_ID, HttpStatus.BAD_REQUEST);
        }

        chowRepository.deleteById(chowId);
    }

    /***************************************************************************************/
    /*************************************** Ranking ***************************************/
    /***************************************************************************************/

    public List<RankingItemDto> retrieveChowListPopularityRanking(String userId, int limit) {
        // Check if user id is valid
        if (!userRepository.existsById(userId)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }

        List<RankingItemDao> rankingItemDaoList = chowRepository.retrieveChowListByPopularityRanking(userId, limit);

        return toRankingItemList(rankingItemDaoList);
    }

    public List<RankingItemDto> retrieveChowListCuisineRanking(String userId, int limit) {
        // Check if user id is valid
        if (!userRepository.existsById(userId)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }

        List<RankingItemDao> rankingItemDaoList = chowRepository.retrieveChowListByCuisineRanking(userId, limit);

        return toRankingItemList(rankingItemDaoList);
    }

    public List<RankingItemDto> retrieveChowListPriceRangeRanking(String userId, int limit) {
        // Check if user id is valid
        if (!userRepository.existsById(userId)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }

        List<RankingItemDao> rankingItemDaoList = chowRepository.retrieveChowListByPriceRangeRanking(userId, limit);

        return toRankingItemList(rankingItemDaoList);
    }

    public List<RankingItemDto> retrieveChowListAreaRanking(String userId, int limit) {
        // Check if user id is valid
        if (!userRepository.existsById(userId)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }

        List<RankingItemDao> rankingItemDaoList = chowRepository.retrieveChowListByAreaRanking(userId, limit);

        return toRankingItemList(rankingItemDaoList);
    }

    /**********************************************************************************************/
    /*************************************** Helper Methods ***************************************/
    /**********************************************************************************************/

    private boolean isNameAvailable(String userId, String name) {
        ChowDao chowDao = chowRepository.retrieveChowByUserIdAndName(userId, name);

        if (chowDao != null) {
            throw new ChowTrackerServiceException(Error.CHOW_NAME_EXISTS, HttpStatus.BAD_REQUEST);
        }

        return true;
    }

    private List<ChowDto> toDtoList(List<ChowDao> chowDaoList) {
        List<ChowDto> chowDtoList = new ArrayList<>();

        if (chowDaoList.isEmpty()) {
            return chowDtoList;
        }

        // Convert ChowDAO list to ChowDTO list
        for (ChowDao chowDAO : chowDaoList) {
            chowDtoList.add(MapperUtil.toDto(chowDAO));
        }

        return chowDtoList;
    }

    private List<RankingItemDto>  toRankingItemList(List<RankingItemDao> rankingItemDaoList) {
        List<RankingItemDto> rankingItemDtoList = new ArrayList<>();

        if (rankingItemDaoList.isEmpty()) {
            return rankingItemDtoList;
        }

        for (RankingItemDao rankingItemDao : rankingItemDaoList) {
            rankingItemDtoList.add(MapperUtil.toDto(rankingItemDao));
        }

        return rankingItemDtoList;
    }

    private <E extends Enum<E>> List<E> getEnumList(List<E> list, Class<E> enumeration) {
        return CollectionUtils.isEmpty(list)
                ? Stream.of(enumeration.getEnumConstants()).collect(Collectors.toList())
                : list;
    }


    private List<ChowDao> filterChowListBySearchString(List<ChowDao> chowDaoList, String searchString) {
        return chowDaoList
                .stream()
                .filter((chowDao) -> chowDao.getName().toLowerCase().contains(searchString.toLowerCase()))
                .sorted(Comparator.comparing(ChowDao::getName))
                .collect(Collectors.toList());
    }
}
