import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tree-grid',
  styleUrl: 'tree-grid.css',
  shadow: true,
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
      [id]: !this.expandedMap[id],
    };
  };

  renderRows(nodes: any[], level: number = 0) {
    return nodes.map((node) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = this.expandedMap[node.id] || false;

      return [
        <tr>
          <td style={{ paddingLeft: `${level * 20}px` }}>
            {hasChildren && (
              <span
                onClick={() => this.toggleExpand(node.id)}
                style={{ cursor: 'pointer', marginRight: '6px' }}
              >
                {isExpanded ? '▾' : '▸'}
              </span>
            )}
            {node.name}
          </td>
          <td>{node.id}</td>
        </tr>,
        hasChildren && isExpanded
          ? this.renderRows(node.children, level + 1)
          : null,
      ];
    });
  }

  render() {
    return (
      <div class="container">
        <h2>Tree Grid</h2>
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
