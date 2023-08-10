export class GraphNode<T> {
    value: T;
    neighbors: GraphNode<T>[];
  
    constructor(value: T) {
      this.value = value;
      this.neighbors = [];
    }
  
    addNeighbor(neighbor: GraphNode<T>) {
      this.neighbors.push(neighbor);
    }
  }
  
  export function topologicalSort<T>(graph: GraphNode<T>[]): GraphNode<T>[] {
    const sorted: GraphNode<T>[] = [];
    const visited: Set<GraphNode<T>> = new Set();
  
    function dfs(node: GraphNode<T>) {
      visited.add(node);
  
      for (const neighbor of node.neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
  
      sorted.unshift(node);
    }
  
    for (const node of graph) {
      if (!visited.has(node)) {
        dfs(node);
      }
    }
  
    return sorted;
  }