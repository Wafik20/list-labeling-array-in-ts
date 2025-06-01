import ListLabelingArray from "./classes/ListLabelingArray";

const lla = new ListLabelingArray(16, 2, 0.5, 0.5);
lla.insert(1);
lla.insert(2);
lla.insert(-2);
lla.insert(5);
lla.beautifulPrint();