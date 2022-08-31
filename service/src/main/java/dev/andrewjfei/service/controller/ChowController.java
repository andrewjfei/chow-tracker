package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.FilterOptionsDto;
import dev.andrewjfei.service.dto.NewChowDto;
import dev.andrewjfei.service.dto.RankingItemDto;
import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.PriceRange;
import dev.andrewjfei.service.service.ChowService;
import dev.andrewjfei.service.util.RequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/chow")
public class ChowController {

    @Autowired
    private ChowService chowService;

    private final Logger logger = LoggerFactory.getLogger(ChowController.class);

    /*****************************************************************************************/
    /*************************************** CRUD APIs ***************************************/
    /*****************************************************************************************/

    @PostMapping
    public ResponseEntity<ChowDto> addNewChow(HttpServletRequest request, @RequestBody NewChowDto newChowDto) {
        String userId = RequestUtil.getUserIdAttribute(request);

        ChowDto chowDto = chowService.createNewChow(userId, newChowDto);

        return new ResponseEntity<>(chowDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ChowDto>> getChowListByUserId(
            HttpServletRequest request,
            @RequestParam(required = false) String searchString,
            @RequestParam(required = false) List<Cuisine> cuisineList,
            @RequestParam(required = false) List<PriceRange> priceRangeList,
            @RequestParam(required = false) List<Area> areaList
            ) {
        String userId = RequestUtil.getUserIdAttribute(request);

        List<ChowDto> chowDtoList = chowService.retrieveChowListByUserId(
                userId,
                searchString,
                cuisineList,
                priceRangeList,
                areaList
        );

        return new ResponseEntity<>(chowDtoList, HttpStatus.OK);
    }

    @PutMapping("/{chowId}")
    public ResponseEntity<ChowDto> modifyChow(
            HttpServletRequest request,
            @RequestBody NewChowDto newChowDto,
            @PathVariable String chowId) {
        RequestUtil.validateRequest(request);

        ChowDto chowDto = chowService.updateChow(newChowDto, chowId);

        return new ResponseEntity<>(chowDto, HttpStatus.OK);
    }

    @DeleteMapping("/{chowId}")
    public ResponseEntity<Void> removeChow(HttpServletRequest request, @PathVariable String chowId) {
        RequestUtil.validateRequest(request);

        chowService.deleteChow(chowId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{chowId}/visit")
    public ResponseEntity<Void> visitChow(HttpServletRequest request, @PathVariable String chowId) {
        RequestUtil.validateRequest(request);

        chowService.incrementChowHasBeen(chowId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /********************************************************************************************/
    /*************************************** Ranking APIs ***************************************/
    /********************************************************************************************/

    @GetMapping("/ranking/popularity")
    public ResponseEntity<List<RankingItemDto>> getChowListPopularityRanking(HttpServletRequest request, @RequestParam int limit) {
        String userId = RequestUtil.getUserIdAttribute(request);

        List<RankingItemDto> rankingItemDtoList = chowService.retrieveChowListPopularityRanking(userId, limit);

        return new ResponseEntity<>(rankingItemDtoList, HttpStatus.OK);
    }

    @GetMapping("/ranking/cuisine")
    public ResponseEntity<List<RankingItemDto>> getChowListCuisineRanking(HttpServletRequest request, @RequestParam int limit) {
        String userId = RequestUtil.getUserIdAttribute(request);

        List<RankingItemDto> rankingItemDtoList = chowService.retrieveChowListCuisineRanking(userId, limit);

        return new ResponseEntity<>(rankingItemDtoList, HttpStatus.OK);
    }

    @GetMapping("/ranking/price-range")
    public ResponseEntity<List<RankingItemDto>> getChowListPriceRangeRanking(HttpServletRequest request, @RequestParam int limit) {
        String userId = RequestUtil.getUserIdAttribute(request);

        List<RankingItemDto> rankingItemDtoList = chowService.retrieveChowListPriceRangeRanking(userId, limit);

        return new ResponseEntity<>(rankingItemDtoList, HttpStatus.OK);
    }

    @GetMapping("/ranking/area")
    public ResponseEntity<List<RankingItemDto>> getChowListAreaRanking(HttpServletRequest request, @RequestParam int limit) {
        String userId = RequestUtil.getUserIdAttribute(request);

        List<RankingItemDto> rankingItemDtoList = chowService.retrieveChowListAreaRanking(userId, limit);

        return new ResponseEntity<>(rankingItemDtoList, HttpStatus.OK);
    }

    /*********************************************************************************************/
    /*************************************** Randomise API ***************************************/
    /*********************************************************************************************/

    @PostMapping("/random")
    public ResponseEntity<ChowDto> getRandomChow(HttpServletRequest request, @RequestBody List<ChowDto> chowDtoList) {
        RequestUtil.validateRequest(request);

        ChowDto chowDto = chowService.selectRandomChow(chowDtoList);

        return new ResponseEntity<>(chowDto, HttpStatus.OK);
    }

    /**************************************************************************************************/
    /*************************************** Filter Options API ***************************************/
    /**************************************************************************************************/

    @GetMapping("/filter-options")
    public ResponseEntity<FilterOptionsDto> getChowFilterOptions(HttpServletRequest request) {
        RequestUtil.validateRequest(request);

        FilterOptionsDto filterOptionsDto = chowService.retrieveChowFilterOptions();

        return new ResponseEntity<>(filterOptionsDto, HttpStatus.OK);
    }
}
