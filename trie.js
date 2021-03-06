
Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){

  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.

  if (index === undefined){
    index = 0;
  }

  if (index < word.length) {
    var letter = [word[index]];
    if(this.characters[letter] === undefined){
      this.characters[letter] = new Trie();
    }
    index++;
    this.characters[letter].learn(word,index);
  } else {
    this.isWord = true;
  }
      
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.

  if (word === undefined) {
    return false; 
  }

  if (index === undefined) {
    index = 0;
  }

  var letter = word[index];
  if (this.characters[letter] === undefined){
    return false;
  }

  index = index || 0;
  if(index < word.length - 1 && this.characters[letter]){
    index += 1;
    return this.characters[letter].find(word, index); 
  } else {
    return this.characters[letter];
  }
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.

  words = words || [];
  currentWord = currentWord || "" ;

  if (this.isWord) {
    words.push(currentWord);
  }

  for(var letter in this.characters) {
    this.characters[letter].getWords(words,currentWord + letter);
  }

  return words;

};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.

  var subTrie = this.find(prefix);
  if(subTrie){
    return subTrie.getWords([], prefix);
  } else {
    return [];
  }

};

try{
  module.exports = Trie;
} catch(e){

}