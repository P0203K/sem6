var app = angular.module("flashcardApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "login.html",
      controller: "LoginController",
    })
    .when("/flashcards", {
      templateUrl: "flashcards.html",
      controller: "FlashcardController",
    })
    .otherwise({
      redirectTo: "/login",
    });
});

app.service("AuthService", function () {
  var flashcardsData = {
    users: [
      {
        username: "preeti",
        password: "123",
        flashcards: [
          {
            title: "AngularJS",
            description: "A client-side web application framework using JavaScript, developed and maintained by Google.",
          },
          {
            title: "MVC Design Pattern",
            description: "A design pattern that divides the application into three interconnected components: Model, View, and Controller.",
          },
          {
            title: "Two-Way Binding",
            description: "A feature of AngularJS that allows for immediate synchronization between the model and the view.",
          },
          {
            title: "SPA (Single Page Application)",
            description: "A web application or website that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from the server.",
          },
        ],
      },
      {
        username: "john",
        password: "abc",
        flashcards: [
          {
            title: "Flashcard A",
            description: "This is the description for Flashcard A.",
          },
          {
            title: "Flashcard B",
            description: "This is the description for Flashcard B.",
          },
          {
            title: "React Basics",
            description: "This flashcard covers the basics of React.",
          },
        ],
      },
      {
        username: "alice",
        password: "password123",
        flashcards: [
          {
            title: "Flashcard X",
            description: "This is the description for Flashcard X.",
          },
          {
            title: "Flashcard Y",
            description: "This is the description for Flashcard Y.",
          },
        ],
      },
    ],
  };

  var currentUser = ""; // Variable to store the current user's username

  this.authenticate = function (username, password) {
    for (var i = 0; i < flashcardsData.users.length; i++) {
      var user = flashcardsData.users[i];
      if (user.username === username && user.password === password) {
        currentUser = username; // Set the current user
        return true;
      }
    }
    return false;
  };

  this.getFlashcardsData = function () {
    return flashcardsData;
  };

  this.getCurrentUser = function () {
    return currentUser; // Return the current user's username
  };
});

app.controller("LoginController", function ($scope, $location, AuthService) {
  $scope.user = {};
  $scope.errorMessage = "";

  $scope.login = function () {
    var username = $scope.user.username;
    var password = $scope.user.password;

    if (AuthService.authenticate(username, password)) {
      $location.path("/flashcards");
    } else {
      $scope.errorMessage = "Invalid username or password. Please try again.";
    }
  };
});

app.controller("FlashcardController", function ($scope, AuthService) {
  var flashcardsData = AuthService.getFlashcardsData();
  var currentUser = AuthService.getCurrentUser();

  var currentUserFlashcards = flashcardsData.users.find(
    (user) => user.username === currentUser
  );

  if (currentUserFlashcards) {
    $scope.flashcards = currentUserFlashcards.flashcards;
  } else {
    $scope.flashcards = [];
  }

  $scope.username = currentUser;

  // Function to add new flashcard
  $scope.addFlashcard = function () {
    if (
      !$scope.newFlashcard ||
      !$scope.newFlashcard.title ||
      !$scope.newFlashcard.description
    ) {
      // Prevent adding flashcards with empty title or description
      return;
    }

    // Add the new flashcard to the list
    $scope.flashcards.push({
      title: $scope.newFlashcard.title,
      description: $scope.newFlashcard.description,
    });

    // Clear the form fields after adding
    $scope.newFlashcard = {};

    $scope.showAddForm = false;
  };

  $scope.filterByTitle = function (flashcard) {
    if (!$scope.searchText) return true;
    return flashcard.title
      .toLowerCase()
      .includes($scope.searchText.toLowerCase());
  };

  // Function to speak out flashcard description
  $scope.speak = function (text) {
    // Check browser support for speech synthesis
    if ("speechSynthesis" in window) {
      // Create SpeechSynthesisUtterance object
      var utterance = new SpeechSynthesisUtterance(text);

      // Speech synthesis configuration
      utterance.lang = "en-US"; // Set language to English (United States)

      // Synthesize speech from the provided text
      window.speechSynthesis.speak(utterance);
    } else {
      // Browser does not support speech synthesis
      console.error("Speech synthesis not supported.");
    }
  };

  $scope.deleteFlashcard = function (flashcard) {
    var index = $scope.flashcards.indexOf(flashcard);
    if (index !== -1) {
      $scope.flashcards.splice(index, 1);
    }
  };
});

app.filter("capitalize", function () {
  return function (input) {
    if (!input) return "";
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

app.directive("flashcardLike", function () {
  return {
    restrict: "A",
    link: function (scope, element) {
      element.on("dblclick", function () {
        scope.$apply(function () {
          scope.flashcard.state =
            scope.flashcard.state === "liked" ? "disliked" : "liked";
          console.log("Double-clicked on flashcard");
          console.log("Flashcard state:", scope.flashcard.state); // Log the state after it's updated
        });
      });
    },
  };
});
