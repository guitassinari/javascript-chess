class King {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "king"
  }
}

module.exports = King