class Queen {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "queen"
  }
}

module.exports = Queen