package com.example.treegrid.service.impl;

import com.example.treegrid.dto.NodeDto;
import com.example.treegrid.model.Node;
import com.example.treegrid.service.TreeService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TreeServiceImpl implements TreeService {

    private List<Node> treeData = new ArrayList<>();

    public TreeServiceImpl() {
        initializeData();
    }

    private void initializeData() {
        Node nodeG1 = new Node("1.1.1.1", "Leaf G1", 3, null); nodeG1.setParentId("1.1.1");
        Node nodeG2 = new Node("1.1.1.2", "Leaf G2", 3, null); nodeG2.setParentId("1.1.1");

        Node nodeF = new Node("1.1.1", "Node F", 2, new ArrayList<>(List.of(nodeG1, nodeG2))); nodeF.setParentId("1.1");
        Node nodeE = new Node("1.1.2", "Node E", 2, null); nodeE.setParentId("1.1");
        Node nodeH = new Node("1.2.1", "Node H", 2, null); nodeH.setParentId("1.2");

        Node nodeC = new Node("1.1", "Node C", 1, new ArrayList<>(List.of(nodeF, nodeE))); nodeC.setParentId("1");
        Node nodeD = new Node("1.2", "Node D", 1, new ArrayList<>(List.of(nodeH))); nodeD.setParentId("1");
        Node nodeI = new Node("1.3", "Node I", 1, null); nodeI.setParentId("1");

        Node nodeA = new Node("1", "Root Node A", 0, new ArrayList<>(List.of(nodeC, nodeD, nodeI))); nodeA.setParentId(null);

        Node nodeJ = new Node("2.1", "Node J", 1, null); nodeJ.setParentId("2");
        Node nodeL = new Node("2.2.1", "Node L", 2, null); nodeL.setParentId("2.2");
        Node nodeM = new Node("2.2.2", "Node M", 2, null); nodeM.setParentId("2.2");

        Node nodeK = new Node("2.2", "Node K", 1, new ArrayList<>(List.of(nodeL, nodeM))); nodeK.setParentId("2");

        Node nodeB = new Node("2", "Root Node B", 0, new ArrayList<>(List.of(nodeJ, nodeK))); nodeB.setParentId(null);

        treeData = new ArrayList<>(List.of(nodeA, nodeB));
    }

    @Override
    public List<Node> getTree() {
        return treeData;
    }

    @Override
    public void addNode(NodeDto nodeDto) {
        List<Node> siblings;
        String parentId = nodeDto.getParentId();

        if (parentId == null) {
            // Adding to root level
            siblings = treeData;
        } else {
            Node parent = findNodeById(treeData, parentId);
            if (parent == null) {
                throw new RuntimeException("Parent not found: " + parentId);
            }
            if (parent.getChildren() == null) {
                parent.setChildren(new ArrayList<>());
            }
            siblings = parent.getChildren();
        }

        int insertIndex = siblings.size();

        if (nodeDto.getSiblingId() != null && nodeDto.getPosition() != null) {
            for (int i = 0; i < siblings.size(); i++) {
                if (siblings.get(i).getId().equals(nodeDto.getSiblingId())) {
                    insertIndex = nodeDto.getPosition().equalsIgnoreCase("above") ? i : i + 1;
                    break;
                }
            }
        }

        // Generate new ID based on sibling index
        String newId = (parentId == null ? "" : parentId + ".") + (insertIndex + 1);

        Node newNode = new Node();
        newNode.setId(newId);
        newNode.setName(nodeDto.getName());
        newNode.setLevel(nodeDto.getLevel());
        newNode.setParentId(parentId);
        newNode.setChildren(new ArrayList<>());

        siblings.add(insertIndex, newNode);

        // Reassign IDs to maintain proper order
        for (int i = 0; i < siblings.size(); i++) {
            Node sibling = siblings.get(i);
            sibling.setId((parentId == null ? "" : parentId + ".") + (i + 1));
        }
    }

    private Node findNodeById(List<Node> nodes, String id) {
        for (Node node : nodes) {
            if (node.getId().equals(id)) return node;
            if (node.getChildren() != null) {
                Node found = findNodeById(node.getChildren(), id);
                if (found != null) return found;
            }
        }
        return null;
    }
}
