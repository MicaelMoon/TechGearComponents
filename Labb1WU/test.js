function findDuplicates(array) {
    const seen = {};
    const duplicates = [];

    array.forEach(item => {
        if (seen[item]) {
            duplicates.push(item);
        } else {
            seen[item] = true; // this is the same as "adding" to seen
        }
    });

    return duplicates;
}

// Example usage
const myArray = [1, 2, 3, 2, 4, 5, 5, 5, 6];
console.log(findDuplicates(myArray)); // Outputs: [2, 5]
