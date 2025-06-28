
import React, { useState } from "react";

const TreeNode = ({ node, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>
          {hasChildren && (
            <span
              onClick={() => setExpanded(!expanded)}
              style={{ cursor: "pointer", marginRight: "6px" }}
            >
              {expanded ? "▾" : "▸"}
            </span>
          )}
          {node.name}
        </td>
        <td>{node.type || "-"}</td>
        <td>{node.id}</td>
      </tr>

      {hasChildren && expanded && node.children.map((child) => (
        <TreeNode key={child.id} node={child} level={level + 1} />
      ))}
    </>
  );
};

export default TreeNode;




