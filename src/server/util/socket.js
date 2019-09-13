const sTR = (roomName, event, payload) => {
  io.in(roomName).emit(event, payload)
}

const sTA = (event, payload) => {
  io.emit(event, payload)
}

module.exports = {
  sTR,
  sTA
}
