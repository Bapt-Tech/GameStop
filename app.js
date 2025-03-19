// Variables
let surveys = [];  // Tableau pour stocker les sondages

// Fonction pour afficher/masquer le formulaire de connexion
function toggleLoginForm() {
    const loginForm = document.getElementById('login');
    loginForm.style.display = (loginForm.style.display === 'none' || loginForm.style.display === '') ? 'block' : 'none';
}

// Authentification
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Identifiants admin
    const adminUsername = 'Bapt-tech';
    const adminPassword = 'Python';

    // Vérification des identifiants
    if (username === adminUsername && password === adminPassword) {
        document.getElementById('login').style.display = 'none';  // Cacher le formulaire de login
        document.getElementById('poll').style.display = 'block';  // Afficher le sondage
        document.getElementById('admin-panel').style.display = 'block';  // Afficher le panel admin
        displaySurveys();  // Afficher les sondages
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// Ajouter un sondage
document.getElementById('add-survey-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('survey-title').value;
    const answers = document.getElementById('survey-answers').value.split(',');

    const newSurvey = {
        title: title,
        answers: answers.map(answer => answer.trim()),
        votes: Array(answers.length).fill(0)  // Initialiser les votes à 0 pour chaque réponse
    };

    surveys.push(newSurvey);
    displaySurveys();
    document.getElementById('survey-title').value = '';
    document.getElementById('survey-answers').value = '';
});

// Afficher les sondages
function displaySurveys() {
    const surveyList = document.getElementById('survey-list');
    surveyList.innerHTML = '';

    surveys.forEach((survey, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${survey.title}</strong><br>
            Réponses : ${survey.answers.join(', ')}
            <button onclick="deleteSurvey(${index})">Supprimer</button>
            <ul>
                ${survey.answers.map((answer, i) => `
                    <li>
                        ${answer} (${survey.votes[i]} votes) 
                        <button onclick="vote(${index}, ${i})">Voter</button>
                    </li>
                `).join('')}
            </ul>
        `;
        surveyList.appendChild(listItem);
    });
}

// Supprimer un sondage
function deleteSurvey(index) {
    surveys.splice(index, 1);
    displaySurveys();
}

// Gérer les votes (limité à un vote par utilisateur)
function vote(surveyIndex, answerIndex) {
    // Vérifier si l'utilisateur a déjà voté
    const userVoted = localStorage.getItem(`voted_${surveyIndex}`);
    if (userVoted) {
        alert('Vous avez déjà voté pour ce sondage.');
        return;
    }

    // Augmenter le nombre de votes pour la réponse sélectionnée
    surveys[surveyIndex].votes[answerIndex]++;
    localStorage.setItem(`voted_${surveyIndex}`, true);  // Enregistrer le vote dans le localStorage
    displaySurveys();  // Mettre à jour l'affichage des sondages
}
