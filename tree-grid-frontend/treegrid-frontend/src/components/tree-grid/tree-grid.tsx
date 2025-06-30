import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tree-grid',
  styleUrl: 'tree-grid.css',
  shadow: true
})
export class TreeGrid {
  @State() treeData: any[] = [];
  @State() expandedMap: { [key: string]: boolean } = {};

  async componentWillLoad() {
    const res = await fetch('http://localhost:8080/api/tree');
    this.treeData = await res.json();
  }

  toggleExpand = (id: string) => {
    this.expandedMap = {
      ...this.expandedMap,
      [id]: !this.expandedMap[id]
    };
  };

  async handleAddChild(parent: any) {
    const name = prompt('Enter child name');
    if (!name) return;

    const newNode = {
      parentId: parent.id,
      name,
      level: parent.level + 1
    };

    await fetch('http://localhost:8080/api/tree/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNode)
    });

    const updated = await fetch('http://localhost:8080/api/tree');
    this.treeData = await updated.json();

    // Ensure parent is expanded
    this.expandedMap = {
      ...this.expandedMap,
      [parent.id]: true
    };
  }


  renderRows(nodes: any[], level: number = 0) {
    return nodes.map(node => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = this.expandedMap[node.id] || false;

      return [
        <tr>
          <td style={{ paddingLeft: `${level * 20}px` }}>
            {hasChildren && (
              <span style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => this.toggleExpand(node.id)}>
                {isExpanded ? '▾' : '▸'}
              </span>
            )}
            {node.name}
            <button class="btn btn-sm btn-outline-primary ms-2" onClick={() => this.handleAddChild(node)}>+ Add</button>
          </td>
          <td>{node.id}</td>
        </tr>,
        hasChildren && isExpanded ? this.renderRows(node.children, level + 1) : null
      ];
    });
  }

  render() {
    return (
      <div class="container">
        <h2>Dynamic Tree Grid</h2>
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{this.renderRows(this.treeData)}</tbody>
        </table>
      </div>
    );
  }
}
