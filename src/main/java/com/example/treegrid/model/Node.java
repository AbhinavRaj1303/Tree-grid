package com.example.treegrid.model;

import java.util.List;

public class Node {
    private String id;
    private String name;
    private int level;
    private String parentId;
    private List<Node> children;

    public Node() {}

    public Node(String id, String name, int level, List<Node> children) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.children = children;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public String getParentId() { return parentId; }
    public void setParentId(String parentId) { this.parentId = parentId; }

    public List<Node> getChildren() { return children; }
    public void setChildren(List<Node> children) { this.children = children; }
}