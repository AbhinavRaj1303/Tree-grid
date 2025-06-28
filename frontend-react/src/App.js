import React from "react";
import TreeGrid from "./components/TreeGrid";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

function App() {
  return (
    <div className="p-4">
      <h1 className="text-primary">Nested Tree Grid View</h1>
      <TreeGrid />
    </div>
  );
}

export default App;


