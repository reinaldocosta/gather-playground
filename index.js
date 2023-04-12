require('dotenv').config()
const { Game } = require("@gathertown/gather-game-client")
global.WebSocket = require("isomorphic-ws")

const SPACE_ID = 'zewQCLqrVTgI6YcQ\\reinaldoacdc' // reinaldoacdc
const game = new Game(SPACE_ID, () => Promise.resolve({ apiKey: process.env.API_KEY }))
// this is the line that actually connects to the server and starts initializing stuff
game.connect()
// optional but helpful callback to track when the connection status changes
game.subscribeToConnection((connected) => {
	console.log("connected?", connected)
	console.log('players: ', game.players[1])
})

game.subscribeToEvent("playerMoves", (data, context) => {
	console.log(
		context?.player?.name ?? context.playerId,
		"moved in direction",
		data.playerMoves.direction
	)
	console.log('ctx: ', context)
})
