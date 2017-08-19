var board = {
  resolution: 3,
  boardID: $("#board"),
  player: "o",
  comb: 0,

  setup: function() {
    this.player = "o";
    this.comb = 0;
    this.boardID.html("");
    for (var i = 0; i < this.resolution; i++) {
      for (var j = 0; j < this.resolution; j++) {
        this.boardID.append(`<div class="block" data-y="${i}" data-x="${j}"></div>`);
      }
    }
  },

  switchPlayer: function() {
    this.player === "o" ? this.player = "x" : this.player = "o";
  },

  checkPosition: function() {
    var that = this;
    this.boardID.on("click", ".block", function() {
      if ($(this).text() === "") {
        $(this).text(that.player);
        that.checkWinner();
        that.checkSpaces();
        that.switchPlayer();
      }
    });
  },

  checkWinner: function() {
    var data;
    // Check left horizontal
    for (var i = 0; i < this.resolution; i++) {
      data = $(`[data-x="${i}"][data-y="${i}"]`);
      this.checkCombination(data);
    }
    this.comb = 0;
    // Check right horizontal
    for (var i = this.resolution - 1; i > -1; i--) {
      var y = (this.resolution - 1) - i;
      data = $(`[data-x="${i}"][data-y="${y}"]`);
      this.checkCombination(data);
    }
    this.comb = 0;
    // Check horizontal
    for (var i = 0; i < this.resolution; i++) {
      for (var j = 0; j < this.resolution; j++) {
        data = $(`[data-x="${i}"][data-y="${j}"]`);
        this.checkCombination(data);
      }
      this.comb = 0;
    }
    // Check vertical
    for (var i = 0; i < this.resolution; i++) {
      for (var j = 0; j < this.resolution; j++) {
        data = $(`[data-x="${j}"][data-y="${i}"]`);
        this.checkCombination(data);
      }
      this.comb = 0;
    }

  },

  checkCombination: function(data) {
    if (data.text() === this.player) {
      this.comb++;
    } else {
      this.comb = 0;
    }

    if (this.comb === this.resolution) {
      this.boardID.html("<h1 class='winner'>Player " + this.player + " wins</h1><h1 class='play'>Restart!</h1>");
    }
  },

  checkSpaces: function() {
    var spaces = 0;
    $(".block").each(function() {
      var that = this
      if ($(this).text() === "") {
        spaces++;
      }
    });

    if (spaces === 0 && $(`h1:contains('Player ${this.player} wins')`).length === 0) {
      $("body").append("<h1 class='winner'>Game Over!</h1><h1 class='play'>Restart!</h1>");
    }
  }
}


$(document).ready(function() {
  $("body").on("click", ".play", function() {
    board.setup();
    $(".play").remove();
    $("h1:contains('Game Over!')").remove();
  });
  board.checkPosition();
});
