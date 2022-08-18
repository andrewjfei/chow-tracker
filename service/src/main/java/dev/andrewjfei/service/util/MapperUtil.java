package dev.andrewjfei.service.util;

import dev.andrewjfei.service.dao.ChowDao;
import dev.andrewjfei.service.dao.RankingItemDao;
import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.ErrorDto;
import dev.andrewjfei.service.dto.RankingItemDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.enumeration.Error;

public class MapperUtil {

    static public RankingItemDto toDto(RankingItemDao rankingItemDao) {
        return new RankingItemDto(rankingItemDao.getItemName(), rankingItemDao.getHasBeen());
    }

    static public ErrorDto toDto(Error error) {
        return new ErrorDto(error.errorCode, error.description);
    }

    static public UserDto toDto(UserDao userDAO, String token) {
        return new UserDto(
                userDAO.getUsername(),
                userDAO.getFirstName(),
                userDAO.getLastName(),
                userDAO.getEmail(),
                token
        );
    }

    static public ChowDto toDto(ChowDao chowDAO) {
        return new ChowDto(
                chowDAO.getId(),
                chowDAO.getName(),
                chowDAO.getCuisine(),
                chowDAO.getPriceRange(),
                chowDAO.getArea(),
                chowDAO.getHasBeen()
        );
    }
}
