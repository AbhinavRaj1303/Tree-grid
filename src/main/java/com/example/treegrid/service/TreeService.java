package com.example.treegrid.service;

import com.example.treegrid.dto.NodeDto;
import com.example.treegrid.model.Node;

import java.util.List;

public interface TreeService {
    List<Node> getTree();
    void addNode(NodeDto nodeDto);
    void deleteNode(String nodeId);
}