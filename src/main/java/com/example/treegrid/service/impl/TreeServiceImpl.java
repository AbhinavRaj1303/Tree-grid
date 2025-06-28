package com.example.treegrid.service.impl;

import com.example.treegrid.model.Node;
import com.example.treegrid.service.TreeService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TreeServiceImpl implements TreeService {

    @Override
    public List<Node> getTree() {
        // Level 3
        Node nodeG1 = new Node("1.1.1.1", "Leaf G1", 3, null);
        Node nodeG2 = new Node("1.1.1.2", "Leaf G2", 3, null);

        // Level 2
        Node nodeF = new Node("1.1.1", "Node F", 2, List.of(nodeG1, nodeG2));
        Node nodeE = new Node("1.1.2", "Node E", 2, null);
        Node nodeH = new Node("1.2.1", "Node H", 2, null);

        // Level 1
        Node nodeC = new Node("1.1", "Node C", 1, List.of(nodeF, nodeE));
        Node nodeD = new Node("1.2", "Node D", 1, List.of(nodeH));
        Node nodeI = new Node("1.3", "Node I", 1, null);

        // Level 0
        Node nodeA = new Node("1", "Root Node A", 0, List.of(nodeC, nodeD, nodeI));
        Node nodeB = new Node("2", "Root Node B", 0, List.of(
                new Node("2.1", "Node J", 1, null),
                new Node("2.2", "Node K", 1, List.of(
                        new Node("2.2.1", "Node L", 2, null),
                        new Node("2.2.2", "Node M", 2, null)
                ))
        ));

        return List.of(nodeA, nodeB);
    }
}