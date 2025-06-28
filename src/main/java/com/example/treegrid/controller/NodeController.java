package com.example.treegrid.controller;

import com.example.treegrid.model.Node;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NodeController {

    @GetMapping("/api/nodes")
    public List<Node> getAllNodes() {

        // Level 3
        Node nodeF = new Node("F", "Node F", 1, null);

        // Level 2
        Node nodeE = new Node("E", "Node E", 2, List.of(nodeF));

        // Level 1
        Node nodeB = new Node("B", "Node B", 1, null);
        Node nodeC = new Node("C", "Node C", 1, null);

        // Level 0 (Roots)
        Node nodeA = new Node("A", "Node A", 2, List.of(nodeB, nodeC));
        Node nodeD = new Node("D", "Node D", 3, List.of(nodeE));

        return List.of(nodeA, nodeD);
    }
}
