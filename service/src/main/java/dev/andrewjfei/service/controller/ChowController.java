package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dto.ChowDto;
import dev.andrewjfei.service.dto.NewChowDto;
import dev.andrewjfei.service.service.ChowService;
import dev.andrewjfei.service.util.RequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/chow")
public class ChowController {

    @Autowired
    private ChowService chowService;

    @PostMapping
    public ResponseEntity<ChowDto> addNewChow(HttpServletRequest request, @RequestBody NewChowDto newChowDto) {
        String userId = RequestUtil.getUserIdAttribute(request);

        ChowDto chowDto = chowService.createNewChow(userId, newChowDto);

        return new ResponseEntity<>(chowDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ChowDto>> getChowListByUserId(HttpServletRequest request) {
        String userId = RequestUtil.getUserIdAttribute(request);

        List<ChowDto> chowDTOList = chowService.retrieveChowListByUserId(userId);

        return new ResponseEntity<>(chowDTOList, HttpStatus.OK);
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
    public ResponseEntity<Void> removeChow( HttpServletRequest request, @PathVariable String chowId) {
        RequestUtil.validateRequest(request);

        chowService.deleteChow(chowId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
