const liItems = document.getElementsByTagName('li');

console.log(`Document: ${document.nodeType}`);
console.log(`HTMLCollection: ${liItems.nodeType}`);

for (const liItem of liItems)
   console.log("liElement: " + liItem.nodeType);
