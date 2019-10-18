var sha256 = require('js-sha256');

function MerkleTree(transactions) {
  this.transactions    = transactions;
  this._oldTransaction = {};
}

MerkleTree.prototype = {

  getOldTransaction: function() { return this._oldTransaction; },

  getRootHash: function() {
    var rootIndex = Object.keys(this._oldTransaction)[Object.keys(this._oldTransaction).length-1]
    return this._oldTransaction[rootIndex];
  },

  
  createTree: function() {
    var transactions = this.transactions,
        temp         = [];

    for (var index = 0; index < this.transactions.length; index += 2) { /** Iterate using 2 step's */
      var transaction_value        = this.transactions[index],
          hash      = { left: '', right: '' },
          position_index   = parseInt(index)+1,
          position_right;

      hash["left"] =  this._oldTransaction[transaction_value] = String(sha256(transaction_value)); /** Apply SHA-256 hash to left pair transaction */


      (position_index != this.transactions.length) ? position_right = this.transactions[position_index] : position_right = ''; /** Declare value of right pair */

      if (position_right != '') { /** Verify existence of right pair */
        hash["right"] = String(sha256(position_right)); /** Apply SHA-256 hash to right pair transaction */
        this._oldTransaction[this.transactions[position_index]] = hash["right"] ; /** Persist log */
        temp.push(hash["left"] + hash["right"]); /** Persist merge of both hash's */
      } else {
        temp.push(hash["left"]); /** Persist merge of left pair if donst have right pair */
      }

    }

    if (this.transactions.length != 1) {
      this.transactions = temp; /** Store changes of transactions */
      this.createTree(); /** Invoke recursive */
    }

  },

	getHashPathToRoot: function(element){

	    var myArray = Object.keys(this._oldTransaction);
	    var toFind = sha256(element);
	    var arrayLength = myArray.length;
	    var results = [];
	    results.push(toFind);
	    var i = 0;

	    while (i < arrayLength) {

	    if (myArray[i].includes(toFind)) {
	      results.push(myArray[i]);
	      temp1 = sha256(myArray[i]);
	      results.push(temp1);
	      toFind = temp1;
		 };
			i++;
		}
	  return results;
 	},

	verifyMerkleMembership: function(element, rootHash, hashPathToRoot){

  //By default verification is false
  var verified = false;


  //First Test: Hash of element being checked has to be the first element in hashPathToRoot
  if (!(sha256(element) == hashPathToRoot[0])) { return verified };

  //Second Test .. root hash has to be last element in hashPathToRoot
  if (!(rootHash == hashPathToRoot[hashPathToRoot.length-1])) { return verified };

  //Third Test: Now all other hashes have to match from initial element to root hash in the path as per hashPathToRoot design
  var i = 1;
  while (i < hashPathToRoot.length-1) {
      if(i%2 == 1){
        //Odd number element must include previous even number element
        if (!(hashPathToRoot[i].includes(hashPathToRoot[i-1]))) { return verified };

        //Hash of odd number element must be same as next even number element
        if (!(sha256(hashPathToRoot[i]) == hashPathToRoot[i+1])){ return verified };
    }
  i=i+2;
  }

  //If all the above tests are passed, verified value can be set to true
  verified = true ;
  return verified;

	}



}

module.exports = MerkleTree;
