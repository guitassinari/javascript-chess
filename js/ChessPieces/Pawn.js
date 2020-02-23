class Pawn {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "pawn"
  }
}

module.exports = Pawn