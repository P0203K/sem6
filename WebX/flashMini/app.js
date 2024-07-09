var app = angular.module('flashcardApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/flashcards', {
            templateUrl: 'flashcards.html',
            controller: 'FlashcardController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.service('AuthService', function() {
    var flashcardsData = {
        "users": [
            {
                "username": "preeti",
                "password": "123",
                "flashcards": [
                    {
                        "title": "Flashcard 1",
                        "description": "This is the description for Flashcard 1."
                    },
                    {
                        "title": "Flashcard 2",
                        "description": "This is the description for Flashcard 2."
                    },
                    {
                        "title": "AngularJS Basics",
                        "description": "This flashcard covers the basics of AngularJS."
                    }
                ]
            },
            {
                "username": "john",
                "password": "abc",
                "flashcards": [
                    {
                        "title": "Flashcard A",
                        "description": "This is the description for Flashcard A."
                    },
                    {
                        "title": "Flashcard B",
                        "description": "This is the description for Flashcard B."
                    },
                    {
                        "title": "React Basics",
                        "description": "This flashcard covers the basics of React."
                    }
                ]
            },
            {
                "username": "alice",
                "password": "password123",
                "flashcards": [
                    {
                        "title": "Flashcard X",
                        "description": "This is the description for Flashcard X."
                    },
                    {
                        "title": "Flashcard Y",
                        "description": "This is the description for Flashcard Y."
                    }
                ]
            }
        ]
    };
    

    this.authenticate = function(username, password) {
        for (var i = 0; i < flashcardsData.users.length; i++) {
            var user = flashcardsData.users[i];
            if (user.username === username && user.password === password) {
                currentUser = username; // Set the current user
                return true;
            }
        }
        return false;
    };

    this.getFlashcardsData = function() {
        return flashcardsData;
    };

    this.getCurrentUser = function() {
        // Implement logic to get the current user's username
        // For simplicity, let's assume it returns a hardcoded username or fetch it from local storage/session storage
        return currentUser; // Assuming currentUser is a variable holding the current username
    };
    
});

app.controller('LoginController', function($scope, $location, AuthService) {
    $scope.user = {};
    $scope.errorMessage = '';

    $scope.login = function() {
        var username = $scope.user.username;
        var password = $scope.user.password;

        if (AuthService.authenticate(username, password)) {
            $location.path('/flashcards');
        } else {
            // Set error message for invalid login
            $scope.errorMessage = 'Invalid username or password. Please try again.';
        }
    };
});


app.controller('FlashcardController', function($scope, AuthService) {
    // Get flashcards data from AuthService
    var flashcardsData = AuthService.getFlashcardsData();

    // Assuming you want to display flashcards for the currently logged-in user
    var currentUser = AuthService.getCurrentUser(); // Implement this function in your AuthService if needed

    // Find the current user's flashcards
    var currentUserFlashcards = flashcardsData.users.find(user => user.username === currentUser);

    // Bind flashcards to scope
    if (currentUserFlashcards) {
        $scope.flashcards = currentUserFlashcards.flashcards;
    } else {
        $scope.flashcards = [];
    }

    $scope.username = currentUser;

    // Function to speak out flashcard description
    $scope.speak = function(text) {
        // Check browser support for speech synthesis
        if ('speechSynthesis' in window) {
            // Create SpeechSynthesisUtterance object
            var utterance = new SpeechSynthesisUtterance(text);

            // Speech synthesis configuration
            utterance.lang = 'en-US'; // Set language to English (United States)

            // Synthesize speech from the provided text
            window.speechSynthesis.speak(utterance);
        } else {
            // Browser does not support speech synthesis
            console.error('Speech synthesis not supported.');
        }
    };
});


app.filter('capitalize', function() {
    return function(input) {
        if (!input) return '';
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
});


