import BalancingTree from "./BalancingTree";

class ListLabelingArray<T> {
    public caliberatorTree: BalancingTree<T>;
    public readonly N: number;
    public readonly C: number;
    public readonly TAU_0: number;
    public readonly TAU_d: number;

    constructor(
        N: number,
        C: number = 6,
        TAU_0: number = 0.5,
        TAU_d: number = 0.75
    ) {
        this.N = N;
        const windowSize = Math.ceil(Math.log2(N)); // Theta(n)
        console.log(`Created a list labeling array with N = ${N}, C = ${C}, window size ${windowSize}, TAU_0 = ${TAU_0}, TAU_d = ${TAU_d}`);
        this.caliberatorTree = new BalancingTree(new Array(C * N).fill(null), windowSize);
        this.C = C;
        this.TAU_0 = TAU_0;
        this.TAU_d = TAU_d;
    }

    beautifulPrint(): void {
        this.caliberatorTree.printASCII();
    }

    insert(val: T): void {
        this.caliberatorTree.insert(val) ?? -1;
        }
}

export default ListLabelingArray;