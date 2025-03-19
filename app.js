document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Identifiants admin (modifiés)
    const adminUsername = 'Bapt-tech';
    const adminPassword = 'Python';

    // Vérification des identifiants
    if (username === adminUsername && password === adminPassword) {
        document.getElementById('login').style.display = 'none';  // Cacher le formulaire de login
        document.getElementById('poll').style.display = 'block';  // Afficher le sondage
        document.getElementById('game').style.display = 'block';  // Afficher le jeu
        document.getElementById('admin-panel').style.display = 'block';  // Afficher le panel admin
    } else {
        // Afficher un message d'erreur si les identifiants sont incorrects
        document.getElementById('login-error').style.display = 'block';
    }
});
