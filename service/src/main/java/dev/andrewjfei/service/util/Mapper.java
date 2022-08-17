package dev.andrewjfei.service.util;

import dev.andrewjfei.service.dao.ChowDAO;
import dev.andrewjfei.service.dto.ChowDTO;

public class Mapper {

    static public ChowDTO toDTO(ChowDAO chowDAO) {
        return new ChowDTO(
                chowDAO.getId(),
                chowDAO.getName(),
                chowDAO.getCuisine(),
                chowDAO.getPriceRange(),
                chowDAO.getArea(),
                chowDAO.getHasBeen()
        );
    }
}
