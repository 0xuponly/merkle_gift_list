const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// Create a Merkle Tree from the nice list and get the root
let merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();
console.log(MERKLE_ROOT)

app.post('/gift', (req, res) => {
  // Grab the parameters from the front-end here
  const { name, proof } = req.body;

  console.log('Received proof:', proof);
  console.log('Type of proof:', typeof proof);

  // Verify the proof
  const isInTheList = verifyProof(MERKLE_ROOT, name, proof);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});