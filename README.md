# List Labeling Array Implementation

A TypeScript implementation of a List Labeling Array data structure with a balancing tree for efficient insertions and maintenance.

## Overview

The List Labeling Array is a data structure that maintains a sorted array with efficient insertions. It uses a balancing tree to manage the density of elements in different segments of the array, ensuring optimal performance.

### Key Features

- Efficient insertions with O(log n) amortized.
- Visual tree representation for debugging
- Configurable parameters for balancing behavior

## Implementation Details

The implementation consists of two main classes:

1. `ListLabelingArray<T>`: The main class that manages the array and provides the public interface
   - Parameters:
     - `N`: Size of the array
     - `C`: Capacity multiplier (default: 6)
     - `TAU_0`: Initial density threshold (default: 0.5)
     - `TAU_d`: Density threshold for rebalancing (default: 0.75)

2. `BalancingTree<T>`: Internal class that manages the tree structure
   - Maintains a balanced tree of array segments
   - Handles insertions and rebalancing
   - Provides visual representation of the tree structure

## Usage

```typescript
import ListLabelingArray from "./classes/ListLabelingArray";

// Create a new List Labeling Array with size 16
const lla = new ListLabelingArray(16, 2, 0.5, 0.5);

// Insert values
lla.insert(1);
lla.insert(2);
lla.insert(-2);
lla.insert(5);

// Visualize the tree structure
lla.beautifulPrint();
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server with live reload:
```bash
npm run watch
```

3. Build the project:
```bash
npm run build
```

4. Run the built project:
```bash
npm start
```
