class Tower {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "tower"
  }
}

module.exports = Tower