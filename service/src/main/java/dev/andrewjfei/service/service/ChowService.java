package dev.andrewjfei.service.service;

import dev.andrewjfei.service.dao.ChowDAO;
import dev.andrewjfei.service.dto.ChowDTO;
import dev.andrewjfei.service.repository.ChowRepository;
import dev.andrewjfei.service.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChowService {

    @Autowired
    private ChowRepository chowRepository;

    public void createNewChow(ChowDAO chowDAO) {
        // Set created time of chow
        chowDAO.setCreated(LocalDateTime.now());
        chowRepository.save(chowDAO);
    }

    public List<ChowDTO> retrieveChowListByUserId(String userId) {
        // TODO: Check if user id is valid

        List<ChowDAO> chowDAOList = chowRepository.retrieveChowListByUserId(userId);
        List<ChowDTO> chowDTOList = new ArrayList<>();

        if (chowDAOList.isEmpty()) {
            return chowDTOList;
        }

        // Convert ChowDAO list to ChowDTO list
        for (ChowDAO chowDAO : chowDAOList) {
            chowDTOList.add(Mapper.toDTO(chowDAO));
        }

        return chowDTOList;
    }

    public void updateChow(ChowDAO chowDAO, String chowId) {
        // Check if chow id is valid
        if (!chowRepository.existsById(chowId)) {
            // TODO: Throw error
        }

        ChowDAO updatedChowDAO = chowRepository.findById(chowId).get();
        updatedChowDAO.setName(chowDAO.getName());
        updatedChowDAO.setCuisine(chowDAO.getCuisine());
        updatedChowDAO.setPriceRange(chowDAO.getPriceRange());
        updatedChowDAO.setArea(chowDAO.getArea());

        chowRepository.save(updatedChowDAO);
    }
    public void deleteChow(String chowId) {
        // Check if chow id is valid
        if (!chowRepository.existsById(chowId)) {
            // TODO: Throw error
        }

        chowRepository.deleteById(chowId);
    }

}
