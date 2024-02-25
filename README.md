# MSTHD Scorer

MSTHD is a Node.js library for scoring test results. It allows users to calculate total points from test outcomes and provides color highlighting based on the score value.

## Installation

You can install Test Score Analyzer via npm:

```bash
npm install msthd-scorer
```

## Usage

**package.json**

```json
...,
"scripts": {
  "test": "jest"
},
"jest": {
  "reporters": [
    "default",
    "msthd-scorer"
  ]
},
...
```