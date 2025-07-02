package com.example.treegrid.controller;

import com.example.treegrid.dto.NodeDto;
import com.example.treegrid.model.Node;
import com.example.treegrid.service.TreeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class TreeGridController {

    private final TreeService treeService;

    public TreeGridController(TreeService treeService) {
        this.treeService = treeService;
    }

    @GetMapping("/api/tree")
    public List<Node> getTreeData() {
        return treeService.getTree();
    }

    @PostMapping("/api/tree/add")
    public ResponseEntity<?> addNode(@RequestBody NodeDto nodeDto) {
        try {
            treeService.addNode(nodeDto);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Unexpected error: " + e.getMessage());
        }
    }

    @DeleteMapping("/api/tree/delete/{id}")
    public ResponseEntity<?> deleteNode(@PathVariable String id) {
        try {
            treeService.deleteNode(id);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException | NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Unexpected error: " + e.getMessage());
        }
    }
}