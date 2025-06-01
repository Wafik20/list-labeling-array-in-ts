class BalancingTree<T> {
    private subarray: Array<T>;
    private size: number;
    private left: BalancingTree<T> | null;
    private right: BalancingTree<T> | null;
    private isLeaf: boolean;

    constructor(subarray: Array<T>) {
        this.subarray = subarray;
        this.size = subarray.length;
        this.left = null;
        this.right = null;
        this.isLeaf = false;

        if (this.subarray.length > 1) {
            const mid = Math.floor(subarray.length / 2);
            this.left = new BalancingTree(subarray.slice(0, mid));
            this.right = new BalancingTree(subarray.slice(mid));
            this.isLeaf = false;
        } else if (this.subarray.length === 1) {
            // Single-element tree is a leaf
            this.isLeaf = true;
        }
        // If empty, the caller should avoid constructing it — or you can throw an error here if you want
    }

    printASCII(): void {
        const lines = this.buildASCIILines();
        lines.forEach(line => console.log(line));
    }

    private buildASCIILines(): string[] {
        const nodeLabel = this.isLeaf ? `[${this.subarray.join(", ")}]` : `(${this.subarray.join(", ")})`;
        
        // If it's a leaf node, just return the label
        if (this.isLeaf || (!this.left && !this.right)) {
            return [nodeLabel];
        }

        const leftLines = this.left ? this.left.buildASCIILines() : [];
        const rightLines = this.right ? this.right.buildASCIILines() : [];

        // Calculate widths
        const leftWidth = leftLines.length > 0 ? Math.max(...leftLines.map(line => line.length)) : 0;
        const rightWidth = rightLines.length > 0 ? Math.max(...rightLines.map(line => line.length)) : 0;
        const nodeLabelWidth = nodeLabel.length;

        // Pad lines to consistent width
        const paddedLeftLines = leftLines.map(line => line.padEnd(leftWidth));
        const paddedRightLines = rightLines.map(line => line.padEnd(rightWidth));

        // Calculate positions
        const leftTreeCenter = Math.floor(leftWidth / 2);
        const rightTreeCenter = Math.floor(rightWidth / 2);
        const totalWidth = leftWidth + rightWidth + 3; // 3 for spacing between trees
        const nodeCenter = Math.floor(totalWidth / 2);

        // Build the result
        const result: string[] = [];

        // Add the node label centered
        const nodeLine = " ".repeat(Math.max(0, nodeCenter - Math.floor(nodeLabelWidth / 2))) + nodeLabel;
        result.push(nodeLine);

        // Add connection lines if we have children
        if (leftLines.length > 0 || rightLines.length > 0) {
            // Create the branch line
            let branchLine = " ".repeat(totalWidth);
            const branchArray = branchLine.split("");

            if (leftLines.length > 0) {
                branchArray[leftTreeCenter] = "┌";
                for (let i = leftTreeCenter + 1; i < nodeCenter; i++) {
                    branchArray[i] = "─";
                }
            }

            if (rightLines.length > 0) {
                const rightStart = leftWidth + 3 + rightTreeCenter;
                branchArray[rightStart] = "┐";
                for (let i = nodeCenter + 1; i < rightStart; i++) {
                    branchArray[i] = "─";
                }
            }

            if (leftLines.length > 0 && rightLines.length > 0) {
                branchArray[nodeCenter] = "┴";
            } else if (leftLines.length > 0) {
                branchArray[nodeCenter] = "┘";
            } else if (rightLines.length > 0) {
                branchArray[nodeCenter] = "└";
            }

            result.push(branchArray.join(""));

            // Add vertical lines
            let verticalLine = " ".repeat(totalWidth);
            const verticalArray = verticalLine.split("");
            if (leftLines.length > 0) verticalArray[leftTreeCenter] = "│";
            if (rightLines.length > 0) verticalArray[leftWidth + 3 + rightTreeCenter] = "│";
            result.push(verticalArray.join(""));
        }

        // Combine left and right subtrees
        const maxSubtreeHeight = Math.max(paddedLeftLines.length, paddedRightLines.length);
        for (let i = 0; i < maxSubtreeHeight; i++) {
            let line = "";
            
            // Add left subtree line (or spaces if no left subtree or line doesn't exist)
            if (i < paddedLeftLines.length) {
                line += paddedLeftLines[i];
            } else {
                line += " ".repeat(leftWidth);
            }
            
            // Add spacing between subtrees
            line += "   ";
            
            // Add right subtree line (or spaces if no right subtree or line doesn't exist)
            if (i < paddedRightLines.length) {
                line += paddedRightLines[i];
            } else {
                line += " ".repeat(rightWidth);
            }
            
            result.push(line);
        }

        return result;
    }
}

export default BalancingTree;