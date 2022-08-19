package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dao.ChowDao;
import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.dto.AuthDto;
import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.ErrorDto;
import dev.andrewjfei.service.dto.NewChowDto;
import dev.andrewjfei.service.dto.RankingItemDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.enumeration.Area;
import dev.andrewjfei.service.enumeration.Cuisine;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.enumeration.PriceRange;
import dev.andrewjfei.service.repository.ChowRepository;
import dev.andrewjfei.service.repository.UserRepository;
import dev.andrewjfei.service.service.AuthService;
import dev.andrewjfei.service.util.MapperUtil;
import dev.andrewjfei.service.util.RandomUtil;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = ("spring.datasource.url=jdbc:h2:mem:chow_tracker")
)
@ExtendWith(MockitoExtension.class)
public class ChowControllerIT {

    private final String CHOW_URI = "/api/chow";
    private final int LIMIT = 3;

    private final String NAME = "Kimchi City";
    private final Cuisine CUISINE = Cuisine.KOREAN;
    private final PriceRange PRICE_RANGE = PriceRange.MEDIUM;
    private final Area AREA = Area.CENTRAL_AUCKLAND;

    private final String USER_ID = "244fdf66-429e-4d1b-9152-616775172e01";      // From data.sql
    private final String USERNAME = "bobbyjones";                               // From data.sql
    private final String EMAIL = "bobbyjones@test.com";                         // From data.sql
    private final String PASSWORD = "password";                                 // From data.sql
    private final int CHOW_LIST_SIZE = 10;                                      // From data.sql
    private final String CHOW_ID = "b4d8d043-1e9d-4977-89e0-53480a327f89";      // From data.sql
    private final int CHOW_HAS_BEEN = 10;                                       // From data.sql

    private final String SEARCH_STRING_PARAM = "La";
    private final String CUISINE_LIST_PARAM = "ITALIAN";
    private final String PRICE_RANGE_LIST_PARAM = "LOW";
    private final String AREA_LIST_PARAM = "CENTRAL_AUCKLAND";

    private final int SEARCH_STRING_PARAM_CHOW_LIST_SIZE = 5;                   // From data.sql
    private final int CUISINE_LIST_PARAM_CHOW_LIST_SIZE = 2;                    // From data.sql
    private final int PRICE_RANGE_LIST_PARAM_CHOW_LIST_SIZE = 3;                // From data.sql
    private final int AREA_LIST_PARAM_CHOW_LIST_SIZE = 5;                       // From data.sql
    private final int COMBINED_PARAMS_CHOW_LIST_SIZE = 0;                       // From data.sql

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ChowController chowController;

    @Autowired
    private AuthService authService;

    @Autowired
    private ChowRepository chowRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        testRestTemplate.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    }

    @AfterEach
    public void teardown() {
        deleteChowByUserIdAndName(USERNAME, NAME);
    }

    @Test
    public void callChowApi_withNoToken_throwsException() {
        // Given

        HttpEntity<Void> request = new HttpEntity<>(null);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                CHOW_URI,
                HttpMethod.GET,
                request,
                ErrorDto.class
        );

        // Then
        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        Assertions.assertEquals(Error.INVALID_USER_REQUEST.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.INVALID_USER_REQUEST.description, response.getBody().description());
    }

    /********************************************************************************************/
    /*************************************** Add New Chow ***************************************/
    /********************************************************************************************/

    @Test
    public void addNewChow_success_returnsChow() {
        // Given
        NewChowDto newChowDto = createNewChowDto(NAME, CUISINE, PRICE_RANGE, AREA);

        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<NewChowDto> request = new HttpEntity<>(newChowDto, headers);

        // When
        ResponseEntity<ChowDto> response = testRestTemplate.exchange(
                CHOW_URI,
                HttpMethod.POST,
                request,
                ChowDto.class
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Assertions.assertEquals(NAME, response.getBody().name());
        Assertions.assertEquals(CUISINE, response.getBody().cuisine());
        Assertions.assertEquals(PRICE_RANGE, response.getBody().priceRange());
        Assertions.assertEquals(AREA, response.getBody().area());
    }

    @Test
    public void addNewChow_withNameAlreadyExists_throwsException() {
        String name = "Machi Machi"; // From data.sql

        // Given
        NewChowDto newChowDto = createNewChowDto(name, CUISINE, PRICE_RANGE, AREA);

        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<NewChowDto> request = new HttpEntity<>(newChowDto, headers);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                CHOW_URI,
                HttpMethod.POST,
                request,
                ErrorDto.class
        );

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.CHOW_NAME_EXISTS.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.CHOW_NAME_EXISTS.description, response.getBody().description());
    }

    /********************************************************************************************************/
    /*************************************** Get Chow List By User Id ***************************************/
    /********************************************************************************************************/

    @Test
    public void getChowListByUserId_withNoFilters_returnsChowList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<List<ChowDto>> response = testRestTemplate.exchange(
                CHOW_URI,
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {}
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(CHOW_LIST_SIZE, response.getBody().size());
    }

    @Test
    public void getChowListByUserId_withSearchStringFilterApplied_returnsChowList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("searchString", SEARCH_STRING_PARAM);
        uriVariables.put("cuisineList", null);
        uriVariables.put("priceRangeList", null);
        uriVariables.put("areaList", null);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<List<ChowDto>> response = testRestTemplate.exchange(
                CHOW_URI + "?" +
                        "searchString={searchString}&" +
                        "cuisineList={cuisineList}&" +
                        "priceRangeList={priceRangeList}&" +
                        "areaList={areaList}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(SEARCH_STRING_PARAM_CHOW_LIST_SIZE, response.getBody().size());
    }

    @Test
    public void getChowListByUserId_withCuisineListFilterApplied_returnsChowList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("searchString", null);
        uriVariables.put("cuisineList",CUISINE_LIST_PARAM);
        uriVariables.put("priceRangeList", null);
        uriVariables.put("areaList", null);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<List<ChowDto>> response = testRestTemplate.exchange(
                CHOW_URI + "?" +
                        "searchString={searchString}&" +
                        "cuisineList={cuisineList}&" +
                        "priceRangeList={priceRangeList}&" +
                        "areaList={areaList}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(CUISINE_LIST_PARAM_CHOW_LIST_SIZE, response.getBody().size());
    }

    @Test
    public void getChowListByUserId_withPriceRangeListFilterApplied_returnsChowList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("searchString", null);
        uriVariables.put("cuisineList", null);
        uriVariables.put("priceRangeList", PRICE_RANGE_LIST_PARAM);
        uriVariables.put("areaList", null);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<List<ChowDto>> response = testRestTemplate.exchange(
                CHOW_URI + "?" +
                        "searchString={searchString}&" +
                        "cuisineList={cuisineList}&" +
                        "priceRangeList={priceRangeList}&" +
                        "areaList={areaList}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(PRICE_RANGE_LIST_PARAM_CHOW_LIST_SIZE, response.getBody().size());
    }

    @Test
    public void getChowListByUserId_withAreaListFilterApplied_returnsChowList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("searchString", null);
        uriVariables.put("cuisineList", null);
        uriVariables.put("priceRangeList", null);
        uriVariables.put("areaList", AREA_LIST_PARAM);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<List<ChowDto>> response = testRestTemplate.exchange(
                CHOW_URI + "?" +
                        "searchString={searchString}&" +
                        "cuisineList={cuisineList}&" +
                        "priceRangeList={priceRangeList}&" +
                        "areaList={areaList}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(AREA_LIST_PARAM_CHOW_LIST_SIZE, response.getBody().size());
    }

    @Test
    public void getChowListByUserId_withAllFiltersApplied_returnsChowList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("searchString", SEARCH_STRING_PARAM);
        uriVariables.put("cuisineList", CUISINE_LIST_PARAM);
        uriVariables.put("priceRangeList", PRICE_RANGE_LIST_PARAM);
        uriVariables.put("areaList", AREA_LIST_PARAM);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<List<ChowDto>> response = testRestTemplate.exchange(
                CHOW_URI + "?" +
                        "searchString={searchString}&" +
                        "cuisineList={cuisineList}&" +
                        "priceRangeList={priceRangeList}&" +
                        "areaList={areaList}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(COMBINED_PARAMS_CHOW_LIST_SIZE, response.getBody().size());
    }

    /*******************************************************************************************/
    /*************************************** Modify Chow ***************************************/
    /*******************************************************************************************/

    @Test
    public void modifyChow_success_returnsChow() {
        String name = "Pankoo";

        // Given
        NewChowDto newChowDto = createNewChowDto(name, CUISINE, PRICE_RANGE, AREA);

        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<NewChowDto> request = new HttpEntity<>(newChowDto, headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("chowId", CHOW_ID);

        ChowDto originalChowDto = retrieveChowByChowId(CHOW_ID); // Retrieve original chow from database

        Assertions.assertNotEquals(name, originalChowDto.name());

        // When
        ResponseEntity<ChowDto> response = testRestTemplate.exchange(
                CHOW_URI + "/{chowId}",
                HttpMethod.PUT,
                request,
                ChowDto.class,
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(name, response.getBody().name());
        Assertions.assertEquals(CUISINE, response.getBody().cuisine());
        Assertions.assertEquals(PRICE_RANGE, response.getBody().priceRange());
        Assertions.assertEquals(AREA, response.getBody().area());

        ChowDto updatedChowDto = retrieveChowByChowId(CHOW_ID); // Retrieve updated chow from database

        Assertions.assertEquals(name, updatedChowDto.name());
        Assertions.assertEquals(CUISINE, updatedChowDto.cuisine());
        Assertions.assertEquals(PRICE_RANGE, updatedChowDto.priceRange());
        Assertions.assertEquals(AREA, updatedChowDto.area());
    }

    @Test
    public void modifyChow_withNameAlreadyExists_throwsException() {
        String name = "Machi Machi"; // From data.sql

        // Given
        NewChowDto newChowDto = createNewChowDto(name, CUISINE, PRICE_RANGE, AREA);

        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<NewChowDto> request = new HttpEntity<>(newChowDto, headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("chowId", CHOW_ID);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                CHOW_URI + "/{chowId}",
                HttpMethod.PUT,
                request,
                ErrorDto.class,
                uriVariables
        );

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.CHOW_NAME_EXISTS.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.CHOW_NAME_EXISTS.description, response.getBody().description());
    }

    /*******************************************************************************************/
    /*************************************** Remove Chow ***************************************/
    /*******************************************************************************************/

    @Test
    public void removeChow_success_returns() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        ChowDto chowDto = createChow(USER_ID, NAME, CUISINE, PRICE_RANGE, AREA); // Create new chow in database

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("chowId", chowDto.id());

        ChowDto originalChowDto = retrieveChowByChowId(chowDto.id()); // Retrieve original chow from database

        Assertions.assertNotNull(originalChowDto);

        // When
        ResponseEntity<Void> response = testRestTemplate.exchange(
                CHOW_URI + "/{chowId}",
                HttpMethod.DELETE,
                request,
                Void.class,
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertNull(response.getBody());

        ChowDto updatedChowDto = retrieveChowByChowId(chowDto.id()); // Retrieve updated chow from database

        Assertions.assertNull(updatedChowDto);
    }

    /******************************************************************************************/
    /*************************************** Visit Chow ***************************************/
    /******************************************************************************************/

    @Test
    public void visitChow_success_returnsChow() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("chowId", CHOW_ID);

        ChowDto originalChowDto = retrieveChowByChowId(CHOW_ID);

        Assertions.assertNotNull(originalChowDto);
        Assertions.assertEquals(CHOW_HAS_BEEN, originalChowDto.hasBeen());

        // When
        ResponseEntity<Void> response = testRestTemplate.exchange(
                CHOW_URI + "/{chowId}/visit",
                HttpMethod.PATCH,
                request,
                Void.class,
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertNull(response.getBody());

        ChowDto updatedChowDto = retrieveChowByChowId(CHOW_ID); // Retrieve updated chow from database

        Assertions.assertNotNull(updatedChowDto);
        Assertions.assertEquals(CHOW_HAS_BEEN + 1, updatedChowDto.hasBeen());
    }

    /*******************************************************************************************************************/
    /*************************************** Get Chow List By Popularity Ranking ***************************************/
    /*******************************************************************************************************************/

    @Test
    public void getChowListByPopularityRanking_success_returnsRankingItemList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("limit", String.valueOf(LIMIT));

        // When
        ResponseEntity<List<RankingItemDto>> response = testRestTemplate.exchange(
                CHOW_URI + "/ranking/popularity?limit={limit}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(LIMIT, response.getBody().size());
    }

    /****************************************************************************************************************/
    /*************************************** Get Chow List By Cuisine Ranking ***************************************/
    /****************************************************************************************************************/

    @Test
    public void getChowListByCuisineRanking_success_returnsRankingItemList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("limit", String.valueOf(LIMIT));

        // When
        ResponseEntity<List<RankingItemDto>> response = testRestTemplate.exchange(
                CHOW_URI + "/ranking/cuisine?limit={limit}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(LIMIT, response.getBody().size());
    }

    /********************************************************************************************************************/
    /*************************************** Get Chow List By Price Range Ranking ***************************************/
    /********************************************************************************************************************/

    @Test
    public void getChowListByPriceRangeRanking_success_returnsRankingItemList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("limit", String.valueOf(LIMIT));

        // When
        ResponseEntity<List<RankingItemDto>> response = testRestTemplate.exchange(
                CHOW_URI + "/ranking/price-range?limit={limit}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(LIMIT, response.getBody().size());
    }

    /*************************************************************************************************************/
    /*************************************** Get Chow List By Area Ranking ***************************************/
    /*************************************************************************************************************/

    @Test
    public void getChowListByAreaRanking_success_returnsRankingItemList() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("limit", String.valueOf(LIMIT));

        // When
        ResponseEntity<List<RankingItemDto>> response = testRestTemplate.exchange(
                CHOW_URI + "/ranking/area?limit={limit}",
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<>() {},
                uriVariables
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(LIMIT, response.getBody().size());
    }

    /***********************************************************************************************/
    /*************************************** Get Random Chow ***************************************/
    /***********************************************************************************************/

    @Test
    public void getRandomChow_success_returnsChow() {
        String name1 = "Fry Guys";
        Cuisine cuisine1 = Cuisine.AMERICAN;
        PriceRange priceRange1 = PriceRange.MEDIUM;
        Area area1 = Area.HAMILTON;

        String name2 = "Sue Sushi";
        Cuisine cuisine2 = Cuisine.JAPANESE;
        PriceRange priceRange2 = PriceRange.MEDIUM;
        Area area2 = Area.CENTRAL_AUCKLAND;

        String name3 = "Dumpling Boys";
        Cuisine cuisine3 = Cuisine.CHINESE;
        PriceRange priceRange3 = PriceRange.LOW;
        Area area3 = Area.EAST_AUCKLAND;

        // Given
        ChowDto chowDto1 = createChowDto(name1, cuisine1, priceRange1, area1);
        ChowDto chowDto2 = createChowDto(name2, cuisine2, priceRange2, area2);
        ChowDto chowDto3 = createChowDto(name3, cuisine3, priceRange3, area3);

        List<ChowDto> chowDtoList = List.of(chowDto1, chowDto2, chowDto3);

        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD); // Login user

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<List<ChowDto>> request = new HttpEntity<>(chowDtoList, headers);

        // Mocking static method using try with resources
        try (MockedStatic<RandomUtil> mockedRandomUtil = Mockito.mockStatic(RandomUtil.class)) {
            mockedRandomUtil.when(() -> RandomUtil.getRandomIndex(anyInt())).thenReturn(1);

            // When
            ResponseEntity<ChowDto> response = testRestTemplate.exchange(
                    CHOW_URI + "/random",
                    HttpMethod.POST,
                    request,
                    ChowDto.class
            );

            // Then
            Assertions.assertNotNull(response);
            Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

            Assertions.assertEquals(name2, response.getBody().name());
            Assertions.assertEquals(cuisine2, response.getBody().cuisine());
            Assertions.assertEquals(priceRange2, response.getBody().priceRange());
            Assertions.assertEquals(area2, response.getBody().area());
        }
    }

    /**********************************************************************************************/
    /*************************************** Helper Methods ***************************************/
    /**********************************************************************************************/

    private UserDto loginUser(String username, String email, String password) {
        AuthDto authDto = new AuthDto(username, email, password);
        return authService.authenticateUser(authDto);
    }

    private NewChowDto createNewChowDto(String name, Cuisine cuisine, PriceRange priceRange, Area area) {
        return new NewChowDto(
                name,
                cuisine,
                priceRange,
                area
        );
    }

    private ChowDto createChowDto(String name, Cuisine cuisine, PriceRange priceRange, Area area) {
        return new ChowDto(
                USER_ID,
                name,
                cuisine,
                priceRange,
                area,
                0
        );
    }

    private void deleteChowByUserIdAndName(String userUsername, String chowName) {
        UserDao userDao = userRepository.retrieveUserByUsername(userUsername);

        if (userDao != null && userDao.getId() != null) {
            ChowDao chowDao = chowRepository.retrieveChowByUserIdAndName(userDao.getId(), chowName);

            if (chowDao != null && chowDao.getId() != null) {
                chowRepository.deleteById(chowDao.getId());
            }
        }
    }

    private ChowDto retrieveChowByChowId(String id) {
        Optional<ChowDao> optionalChowDao = chowRepository.findById(id);

        if (optionalChowDao.isPresent()) {
            return MapperUtil.toDto(optionalChowDao.get());
        }

        return null;
    }

    // Create chow in database
    private ChowDto createChow(String userId, String name, Cuisine cuisine, PriceRange priceRange, Area area) {
        ChowDao chowDao = new ChowDao(userId, name, cuisine, priceRange, area);

        ChowDao newChowDao = chowRepository.save(chowDao);

        return MapperUtil.toDto(newChowDao);
    }
}
