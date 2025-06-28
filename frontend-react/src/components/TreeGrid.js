// src/components/TreeGrid.js
import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";

const TreeGrid = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tree")
      .then((res) => res.json())
      .then((data) => setTreeData(data))
      .catch((err) => console.error("Error fetching tree data:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tree Grid</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {treeData.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreeGrid;



