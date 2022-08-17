package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dao.ChowDAO;
import dev.andrewjfei.service.dto.ChowDTO;
import dev.andrewjfei.service.service.ChowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chow")
public class ChowController {

    @Autowired
    private ChowService chowService;

    @PostMapping
    public ResponseEntity<Void> addNewChow(@RequestBody ChowDAO chowDAO) {
        chowService.createNewChow(chowDAO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ChowDTO>> getChowListByUserId() {
        // TODO: Get user id from token

        List<ChowDTO> chowList = chowService.retrieveChowListByUserId("TEST");

        return new ResponseEntity<>(chowList, HttpStatus.OK);
    }

    @PutMapping("/{chowId}")
    public ResponseEntity<Void> modifyChow(@RequestBody ChowDAO chowDAO, @RequestParam String chowId) {
        chowService.updateChow(chowDAO, chowId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{chowId}")
    public ResponseEntity<Void> deleteChow(@RequestParam String chowId) {
        chowService.deleteChow(chowId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
