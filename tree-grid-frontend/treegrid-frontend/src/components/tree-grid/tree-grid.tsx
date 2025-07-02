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
      parentId: type === 'child' ? targetNode.id : parentNode?.id ?? null,
      siblingId: type === 'child' ? null : targetNode.id,
      position: type === 'child' ? null : type
    };

    console.log('📤 Sending node data to backend:', JSON.stringify(newNode));

    try {
      const response = await fetch('http://localhost:8080/api/tree/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNode)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      await this.loadData();

      const expandId = newNode.parentId;
      if (expandId) {
        this.expandedMap = {
          ...this.expandedMap,
          [expandId]: true
        };
      }
    } catch (error) {
      console.error('Failed to add node:', error);
      alert(`Failed to add node: ${(error as Error).message}`);
    }
  }

  async handleDelete(node: any) {
    if (!confirm(`Are you sure you want to delete '${node.name}'?`)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/tree/delete/${node.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      await this.loadData();
    } catch (error) {
      console.error('Delete failed:', error);
      alert(`Delete failed: ${(error as Error).message}`);
    }
  }

  renderRows(nodes: any[], level: number = 0, parent: any = null) {
    return nodes.map(node => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = this.expandedMap[node.id] || false;

      return [
        <tr>
          <td style={{ paddingLeft: `${level * 24}px`, whiteSpace: 'nowrap' }}>
            <span style={{ display: 'inline-block', width: '12px' }}>
              {hasChildren ? (isExpanded ? '▾' : '▸') : ''}
            </span>
            <span
              style={{ cursor: hasChildren ? 'pointer' : 'default', marginRight: '5px' }}
              onClick={() => hasChildren && this.toggleExpand(node.id)}
            >
              {node.name}
            </span>
          </td>
          <td>{node.id}</td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-primary" onClick={() => this.handleAdd('child', node)}>+ Child</button>
              <button class="btn btn-outline-success" onClick={() => this.handleAdd('above', node, parent)}>↑ Above</button>
              <button class="btn btn-outline-warning" onClick={() => this.handleAdd('below', node, parent)}>↓ Below</button>
              <button class="btn btn-outline-danger" onClick={() => this.handleDelete(node)}>🗑 Delete</button>
            </div>
          </td>
        </tr>,
        hasChildren && isExpanded ? this.renderRows(node.children, level + 1, node) : null
      ];
    });
  }

  render() {
    return (
      <div class="container-fluid mt-5 px-4">
        <h2 class="mb-4 text-primary">Dynamic Tree Grid</h2>
        <div class="table-responsive">
          <table class="table table-bordered table-hover align-middle w-100">
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
