/* fetch local json */
async function fetchJSON() {
    try {
        const response = await fetch('./run_archive.json');
        const data = await response.json();
        // console.log(`Data fetched`);  // temp
        return data;
    } catch (err) {
        console.log(err);
    }
}

/* ISN'T USED ANYWHERE */
function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
