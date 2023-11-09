const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Create a Merkle Tree from the nice list
  let merkleTree = new MerkleTree(niceList);

  // Generate a proof for a specific name
  const name = 'Norman Block';
  const index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);

  // Send the proof to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: 'Norman Block',
    proof: proof
  });

  console.log({ gift });
}

main();