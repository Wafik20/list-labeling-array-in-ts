import BalancingTree from "./BalancingTree";

class ListLabelingArray<T> {
    public caliberatorTree: BalancingTree<T>;
    public arr: Array<T>;
    public readonly N: number;
    public readonly C: number;
    public readonly TAU_0: number;
    public readonly TAU_d: number;
    public readonly windowSize: number;

    constructor(
        N: number,
        C: number = 6,
        TAU_0: number = 0.5,
        TAU_d: number = 0.75
    ) {
        this.N = N;
        this.arr = new Array(C * N).fill(null);
        const windowSize = Math.ceil(Math.log2(N)); // Theta(n)
        this.windowSize = windowSize;
        this.caliberatorTree = new BalancingTree(this.arr, windowSize);
        this.C = C;
        this.TAU_0 = TAU_0;
        this.TAU_d = TAU_d;
    }

    beautifulPrint(): void {
        console.log(`A list labeling array with N = ${this.N}, C = ${this.C}, window size ${this.windowSize}, TAU_0 = ${this.TAU_0}, TAU_d = ${this.TAU_d}`);
        console.log(this.arr);
        this.caliberatorTree.printSimpleASCII();
    }

    insert(tbi: T): void {
        let window = this.caliberatorTree.insert(tbi);
        window.size += 1;
        const indexToInsert = this.binarySearch(window.val, tbi);
        const windowDensity = window.size / window.val.length;
        window.val[indexToInsert] = tbi;
        if(windowDensity > this.TAU_d) {
            console.log(`window ${window} has density ${windowDensity} > ${this.TAU_d}`);
            this.rebalance(window);
        }
    }

    binarySearch(subarray: Array<T>, val: T): number {
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

    rebalance(window: any): void {
        console.log(`Rebalancing tree starting at window ${window}`);
        return;
    }
}

export default ListLabelingArray;