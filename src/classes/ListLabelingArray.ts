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

    insert(val: T): void {
        const indexToBeInserted = this.caliberatorTree.insert(val) ?? -1;
        this.arr[indexToBeInserted] = val;
        console.log(`Inserted ${val} at index ${indexToBeInserted}`);
    }
}

export default ListLabelingArray;