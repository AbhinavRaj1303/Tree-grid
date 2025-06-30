package com.example.treegrid.controller;

import com.example.treegrid.dto.NodeDto;
import com.example.treegrid.model.Node;
import com.example.treegrid.service.TreeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void addNode(@RequestBody NodeDto nodeDto) {
        treeService.addNode(nodeDto);
    }
}