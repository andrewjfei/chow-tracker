package dev.andrewjfei.service.util;

import dev.andrewjfei.service.dao.ChowDao;
import dev.andrewjfei.service.dao.RankingItemDao;
import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.ErrorDto;
import dev.andrewjfei.service.dto.RankingItemDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.enumeration.Error;

import java.util.ArrayList;
import java.util.List;

public class MapperUtil {

    static public RankingItemDto toDto(RankingItemDao rankingItemDao, int ranking) {
        return new RankingItemDto(ranking, rankingItemDao.getItemName(), rankingItemDao.getHasBeen());
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

    static public ChowDto toDto(ChowDao chowDao) {
        return new ChowDto(
                chowDao.getId(),
                chowDao.getName(),
                chowDao.getCuisine(),
                chowDao.getPriceRange(),
                chowDao.getArea(),
                chowDao.getHasBeen()
        );
    }
}
