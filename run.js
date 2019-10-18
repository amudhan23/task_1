var sha256 = require('js-sha256');

var MerkleTree  = require('./MerkleTree.js'),
    randoms = Array(2000).fill().map(() => Math.round(Math.random() * 2000))
		transaction=randoms.map(String)
    tree        = new MerkleTree(transaction);


tree.createTree();
rootHash=tree.getRootHash();
tree_path_10=tree.getHashPathToRoot(transaction[10])
tree_path_500=tree.getHashPathToRoot(transaction[500])
tree_path_1000=tree.getHashPathToRoot(transaction[1000])
tree_path_1500=tree.getHashPathToRoot(transaction[1500])
tree_path_1900=tree.getHashPathToRoot(transaction[1900])

verify_element_10=tree.verifyMerkleMembership(transaction[10],rootHash,tree_path_10)
verify_element_500=tree.verifyMerkleMembership(transaction[501],rootHash,tree_path_500)
verify_element_1000=tree.verifyMerkleMembership(transaction[1000],rootHash,tree_path_1000)
verify_element_1500=tree.verifyMerkleMembership(transaction[1500],rootHash,tree_path_1500)
verify_element_1900=tree.verifyMerkleMembership(transaction[1900],rootHash,tree_path_1900)

// console.log('\ntree_path_10: ',tree_path_10)
// console.log('\ntree_path_500: ',tree_path_500)
// console.log('\ntree_path_1000: ',tree_path_1000)
// console.log('\ntree_path_1500: ',tree_path_1500)
// console.log('\ntree_path_1900: ',tree_path_1900)

console.log('verification for element in index : 10 ',"\t",verify_element_10)
console.log('verification for element in index : 500 ',"\t",verify_element_500)
console.log('verification for element in index : 1000 ',"\t",verify_element_1000)
console.log('verification for element in index : 1500 ',"\t",verify_element_1500)
console.log('verification for element in index : 1900 ',"\t",verify_element_1900)
