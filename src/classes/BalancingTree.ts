class Node<T> {
    public val: T;
    public size: number = 0;
    public left: Node<T> | null;
    public right: Node<T> | null;
    public isLeaf: boolean = false;

    constructor(val: T, originalStartIndex: number = 0) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BalancingTree<T> {
    private root: Node<Array<T>>;

    constructor(sourceArray: Array<T>, stopAtLength: number = 1) {
        this.root = this.buildTree(sourceArray, stopAtLength);
    }

    private buildTree(subarray: Array<T>, stopAtLength: number): Node<Array<T>> {
        const node = new Node(subarray);

        // Stop subdividing when we reach or go below stopAtLength
        if (subarray.length > stopAtLength) {
            const mid = Math.floor(subarray.length / 2);
            node.left = this.buildTree(subarray.slice(0, mid), stopAtLength);
            node.right = this.buildTree(subarray.slice(mid), stopAtLength);
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

    // Print ASCII representation of the tree
    public printASCII(): void {
        console.log("Tree Structure:");
        this.printASCIIHelper(this.root, "", true);
    }

    private printASCIIHelper(node: Node<Array<T>> | null, prefix: string, isLast: boolean): void {
        if (node === null) return;

        // Print current node
        const connector = isLast ? "└── " : "├── ";
        const nodeValue = `[${node.val.map(item => item === null ? 'x' : item).join(', ')}]`;
        const nodeDensity = node.size / node.val.length;
        const nodeInfo = node.isLeaf ? ` (leaf, size: ${node.size}, tau = ${nodeDensity})` : ` (size: ${node.size}, tau = ${nodeDensity})`;
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

    public insert(val: T): void {
        this.insertHelper(this.root, val);
        return;
    }

    private insertHelper(node: Node<Array<T>>, tbi: T): number | void {
        if (node.isLeaf) {
            const indexToInsert = this.binarySearch(node.val, tbi);
            node.size += 1;
            if(indexToInsert >= node.val.length) {
                console.log(`can't insert ${tbi} into [${node.val}] at index ${indexToInsert}, it is out of bounds`);
                return;
            }
            node.val[indexToInsert] = tbi;
            return;
        } else {
            const leftSubArr = node.left?.val;
            const lastValInLeftSubArr = leftSubArr?.[leftSubArr.length - 1] || 0; // that 0 works only for type number, what can i do?
            if (node.right && tbi > lastValInLeftSubArr) {
                this.insertHelper(node.right, tbi);
                node.size += 1;
                return;
            } else if (node.left && tbi <= lastValInLeftSubArr) {
                this.insertHelper(node.left, tbi);
                node.size += 1;
                return;
            } else {
                return;
            }
        }
    }

    binarySearch(subarray: Array<T>, val: T, compareFunction?: (a: T, b: T) => number): number {
        let array = subarray;
        let left = 0;
        let right = array.length - 1;

        // Handle edge cases
        if (array.length === 0) return 0;

        // Binary search for insertion point
        while (left <= right) {  // Changed condition to <=
            const mid = Math.floor((left + right) / 2);
            
            if (array[mid] >= val || array[mid] === null) {
                // array[mid] < val, so insertion point is to the right
                right = mid - 1;
            } else {
                // array[mid] >= val, so insertion point is at or to the left of mid
                left = mid + 1;  // This is now correct with the <= condition
            }
        }

        return left;
    }
}

export default BalancingTree;