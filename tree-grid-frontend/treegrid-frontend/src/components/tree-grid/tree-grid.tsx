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
    await this.loadData();
  }

  async loadData() {
    const res = await fetch('http://localhost:8080/api/tree');
    this.treeData = await res.json();
  }

  toggleExpand = (id: string) => {
    this.expandedMap = {
      ...this.expandedMap,
      [id]: !this.expandedMap[id]
    };
  };

  async handleAdd(type: 'child' | 'above' | 'below', targetNode: any, parentNode: any = null) {
    const name = prompt(`Enter name for new node to add ${type}`);
    if (!name) return;

    const newNode = {
      name,
      level: type === 'child' ? targetNode.level + 1 : targetNode.level,
      parentId: type === 'child' ? targetNode.id : targetNode.parentId,
      siblingId: type === 'child' ? null : targetNode.id,
      position: type === 'child' ? null : type
    };

    console.log("📤 Sending node data to backend:", JSON.stringify(newNode));

    try {
      const response = await fetch('http://localhost:8080/api/tree/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNode)
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      await this.loadData();

      const expandId = type === 'child' ? targetNode.id : targetNode.parentId;
      this.expandedMap = {
        ...this.expandedMap,
        [expandId]: true
      };
    } catch (error) {
      console.error('Failed to add node:', error);
      alert('Failed to add node. See console for details.');
    }
  }

  renderRows(nodes: any[], level: number = 0, parent: any = null) {
    return nodes.map(node => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = this.expandedMap[node.id] || false;

      return [
        <tr>
          <td style={{ paddingLeft: `${level * 24}px` }}>
            <span style={{ display: 'inline-block', width: '16px' }}>
              {hasChildren ? (isExpanded ? '▾' : '▸') : ''}
            </span>
            <span
              style={{ cursor: hasChildren ? 'pointer' : 'default', marginLeft: hasChildren ? '5px' : '21px' }}
              onClick={() => hasChildren && this.toggleExpand(node.id)}
            >
              {node.name}
            </span>
          </td>
          <td>{node.id}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary" onClick={() => this.handleAdd('child', node)}>+ Child</button>
              <button class="btn btn-outline-success" onClick={() => this.handleAdd('above', parent, node)}>↑ Above</button>
              <button class="btn btn-outline-warning" onClick={() => this.handleAdd('below', parent, node)}>↓ Below</button>
            </div>
          </td>
        </tr>,
        hasChildren && isExpanded ? this.renderRows(node.children, level + 1, node) : null
      ];
    });
  }

  render() {
    return (
      <div style={{ width: '100vw', padding: '20px' }}>
        <h2 class="mb-4 text-primary">Dynamic Tree Grid</h2>
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Node Name</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.renderRows(this.treeData)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
