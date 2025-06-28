package com.example.treegrid.model;

import java.util.List;

public class Node {
    private String id;
    private String name;
    private int level;
    private List<Node> children;

    public Node() {}

    public Node(String id, String name, int level, List<Node> children) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.children = children;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public int getLevel() { return level; }
    public List<Node> getChildren() { return children; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setLevel(int level) { this.level = level; }
    public void setChildren(List<Node> children) { this.children = children; }
}
