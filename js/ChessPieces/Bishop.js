class Bishop {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }
  
  name() {
    return "bishop"
  }
}

module.exports = Bishop