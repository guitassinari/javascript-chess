class NullPiece {
  constructor() {
    this.team = ""
  }

  can_move(from, to) {
    return false
  }

  name() {
    return null
  }
}

module.exports = NullPiece