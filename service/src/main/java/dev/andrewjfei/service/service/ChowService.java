package dev.andrewjfei.service.service;

import dev.andrewjfei.service.dao.ChowDao;
import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.NewChowDto;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.exception.ChowTrackerServiceException;
import dev.andrewjfei.service.repository.ChowRepository;
import dev.andrewjfei.service.repository.UserRepository;
import dev.andrewjfei.service.util.MapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChowService {

    @Autowired
    private ChowRepository chowRepository;

    @Autowired
    private UserRepository userRepository;

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

    public List<ChowDto> retrieveChowListByUserId(String userId) {
        // Check if user id is valid
        if (!userRepository.existsById(userId)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }

        List<ChowDao> chowDAOList = chowRepository.retrieveChowListByUserId(userId);
        List<ChowDto> chowDTOList = new ArrayList<>();

        if (chowDAOList.isEmpty()) {
            return chowDTOList;
        }

        // Convert ChowDAO list to ChowDTO list
        for (ChowDao chowDAO : chowDAOList) {
            chowDTOList.add(MapperUtil.toDto(chowDAO));
        }

        return chowDTOList;
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

    public boolean isNameAvailable(String userId, String name) {
        ChowDao chowDao = chowRepository.retrieveChowByUserIdAndName(userId, name);

        if (chowDao != null) {
            throw new ChowTrackerServiceException(Error.CHOW_NAME_EXISTS, HttpStatus.BAD_REQUEST);
        }

        return true;
    }
}
