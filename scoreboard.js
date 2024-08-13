let scoreA = 0;
let scoreB = 0;


window.onload = function() {
    loadSavedScores();
};

function updateScoreboard() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
}

function incrementScore(team) {
    if (team === 'A') {
        scoreA++;
    }
    else if (team === "A2"){
        scoreA += 2;
    }
    else if (team === "A3"){
        scoreA += 3;

    //increment B
    } else if (team === 'B') {
        scoreB++;
    } else if (team === 'B2'){
        scoreB += 2;
    }
     else if (team === 'B3'){
        scoreB += 3;
    }
    updateScoreboard();
}

function decrementScore(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
    
    }else if (team === 'A2' && scoreA > 0){
        scoreA -= 2;
    }else if (team === 'A3' && scoreA > 0){
        scoreA -= 3;
    }
    //decrement B
    else if (team === 'B' && scoreB > 0) {
        scoreB--;
    }
     else if (team === 'B2' && scoreB > 0) {
        scoreB -= 2;
    }
     else if (team === 'B3' && scoreB > 0) {
        scoreB -= 3;
    }
    updateScoreboard();
}

function resetScores() {
    scoreA = 0;
    scoreB = 0;
    updateScoreboard();
}

function saveScores() {
    const description = prompt('Enter a description for this score:');
    if (!description) {
        alert('Description is required to save the score.');
        return;
    }

    const savedScoresDiv = document.getElementById('savedScores');
    const newScore = createScoreElement(scoreA, scoreB, description);
    savedScoresDiv.style.display = "block"
    savedScoresDiv.appendChild(newScore);

    // Save the score and description to localStorage
    const savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];
    savedScores.push({ scoreA, scoreB, description });
    localStorage.setItem('savedScores', JSON.stringify(savedScores));
}

function createScoreElement(scoreA, scoreB, description, index = null) {
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'saved-score';
    scoreDiv.innerHTML = `
        Team A: ${scoreA} - Team B: ${scoreB}<br>
        Description: <span class="description-text">${description}</span>
        <button onclick="editScore(${index})">Edit</button>
        <button onclick="deleteScore(${index})">Delete</button>
    `;
    return scoreDiv;
}

function loadSavedScores() {
    const savedScoresDiv = document.getElementById('savedScores');
    savedScoresDiv.innerHTML = ''; // Clear the current saved scores
    const savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];

    savedScores.forEach((score, index) => {
        const scoreElement = createScoreElement(score.scoreA, score.scoreB, score.description, index);
        savedScoresDiv.appendChild(scoreElement);
    });
}

function deleteScore(index) {
    let savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];
    savedScores.splice(index, 1); // Remove the score at the specified index
    localStorage.setItem('savedScores', JSON.stringify(savedScores)); // Update localStorage
    loadSavedScores(); // Reload the scores to reflect the changes
}

function editScore(index) {
    let savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];
    const newDescription = prompt('Edit the description:', savedScores[index].description);
    if (newDescription) {
        savedScores[index].description = newDescription;
        localStorage.setItem('savedScores', JSON.stringify(savedScores)); // Update localStorage
        loadSavedScores(); // Reload the scores to reflect the changes
    }
}
