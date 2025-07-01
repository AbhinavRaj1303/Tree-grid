package com.example.treegrid.dto;

public class NodeDto {
    private String parentId;
    private String name;
    private int level;
    private String siblingId;
    private String position;

    public String getParentId() { return parentId; }
    public void setParentId(String parentId) { this.parentId = parentId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public String getSiblingId() { return siblingId; }
    public void setSiblingId(String siblingId) { this.siblingId = siblingId; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
}
