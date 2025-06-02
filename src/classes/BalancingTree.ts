class Node<T> {
    public val: T;
    public size: number = 0;
    public left: Node<T> | null;
    public right: Node<T> | null;
    public parent: Node<T> | null = null;
    public isLeaf: boolean = false;

    constructor(val: T, parent: Node<T> | null = null) {
        this.parent = parent;
        this.val = val;
        this.left = null;
        this.right = null;
    }

    public toString(): string {
        return `Node(val: ${this.val}, size: ${this.size}, isLeaf: ${this.isLeaf})`;
    }
}

class BalancingTree<T> {
    private root: Node<Array<T>>;

    constructor(sourceArray: Array<T>, stopAtLength: number = 1) {
        this.root = this.buildTree(sourceArray, stopAtLength);
    }

    private buildTree(subarray: Array<T>, stopAtLength: number, parent: Node<Array<T>> | null = null): Node<Array<T>> {
        const node = new Node(subarray, parent);

        // Stop subdividing when we reach or go below stopAtLength
        if (subarray.length > stopAtLength) {
            const mid = Math.floor(subarray.length / 2);
            node.left = this.buildTree(subarray.slice(0, mid), stopAtLength, node);
            node.right = this.buildTree(subarray.slice(mid), stopAtLength, node);
            node.isLeaf = false;
        } else if (subarray.length <= stopAtLength && subarray.length > 0) {
            // When we reach the stop length or below, mark as leaf
            node.isLeaf = true;
            node.left = null;
            node.right = null;
        }

        // Handle empty arrays (optional - you might want to throw an error instead)
        if (subarray.length === 0) {
            node.isLeaf = true;
        }

        return node;
    }

    // Helper method to get the root (useful for testing/debugging)
    public getRoot(): Node<Array<T>> {
        return this.root;
    }

    // Method to print the tree structure in a simple ASCII format
    public printSimpleASCII(): void {
        console.log("Tree Structure:");
        this.printASCIIHelper(this.root, "", true);
    }

    private printASCIIHelper(node: Node<Array<T>> | null, prefix: string, isLast: boolean): void {
        if (node === null) return;

        // Print current node
        const connector = isLast ? "└── " : "├── ";
        const nodeValue = `[${node.val.map(item => item === null ? 'x' : item).join(', ')}]`;
        const nodeDensity = node.size / node.val.length;
        const nodeInfo = node.isLeaf ? ` (leaf, size: ${node.size}, τ = ${nodeDensity.toFixed(2)})` : ` (size: ${node.size}, τ = ${nodeDensity.toFixed(2)})`;
        console.log(prefix + connector + nodeValue + nodeInfo);

        // Calculate prefix for children
        const childPrefix = prefix + (isLast ? "    " : "│   ");

        // Print children (left first, then right)
        if (node.left !== null || node.right !== null) {
            if (node.left !== null) {
                this.printASCIIHelper(node.left, childPrefix, node.right === null);
            }
            if (node.right !== null) {
                this.printASCIIHelper(node.right, childPrefix, true);
            }
        }
    }

    public insert(val: T): Node<Array<T>> {
        return this.insertHelper(this.root, val)
    }

    private insertHelper(node: Node<Array<T>>, tbi: T, startIndex: number = 0): Node<Array<T>> {
        if (node.isLeaf) {
            return node;
        } else {
            const leftSubArr = node.left?.val;
            const lastValInLeftSubArr = leftSubArr?.[leftSubArr.length - 1] || 0; // that 0 works only for type number, what can i do?
            if (node.right && tbi > lastValInLeftSubArr) {
                node.size += 1;
                return this.insertHelper(node.right, tbi, startIndex + (node.left?.val.length || 0));
            } else if (node.left && tbi <= lastValInLeftSubArr) {
                node.size += 1;
                return this.insertHelper(node.left, tbi, startIndex);
            } else {
                return node;
            }
        }
    }
}

export default BalancingTree;