(function() {

  const app = angular.module('app', []);
  const urlBase = "https://ilio-api-notes.herokuapp.com/notes"

  app.controller('IndexController', IndexController)

  IndexController.$inject = ['$scope', '$http']
  function IndexController($scope, $http) {
    $scope.message = ""
    $scope.newNote = {}
    $scope.notes = []
    $scope.noteEdition = null

    $scope.habilitarEdicao = habilitarEdicao

    $scope.addNote = addNote
    $scope.loadNotes = loadNotes
    $scope.putNote = putNote
    $scope.deleteNote = deleteNote

    function loadNotes() {
      $http
        .get(urlBase)
        .then((response) => {
          $scope.notes = response.data.data
        })
        .catch((response) => {
          $scope.message = "Não foi possível conectar ao servidor."
          console.error(response)
        })
    }

    function addNote(newNote) {
      $http
        .post(urlBase, newNote)
        .then((response) => {
          alert("Nota cadastrada com sucesso!")
          loadNotes()
        })

        .catch((response) => {
          $scope.message = "Não foi possível salvar a nota nova."
          console.error(response)
        })
    }

    function putNote(note) {
      $http
        .put(urlBase + "/" + note._id, note)
        .then((response) => {
        $scope.noteEdition = null
          alert("Nota salva com sucesso!")
          loadNotes()
        })
        .catch((response) => {
          $scope.message = "Erro ao editar nota"
          console.error(response)
        })
    }

    function deleteNote(idNote) {
      $http
        .delete(urlBase + "/" + idNote)
        .then((response) => {
          alert("Nota apagada com sucesso!")
          loadNotes()
        })
        .catch((response) => {
          $scope.message = "Erro ao excluir nota"
          console.error(response)
        })
    }

    function habilitarEdicao(note) {
      $scope.noteEdition = angular.copy(note)
    }

    loadNotes()
  }

})();
