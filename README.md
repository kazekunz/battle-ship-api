# Battle ship API

```
npm run start-dev
```

**Game Rules:**

The game starts with a fleet (1x battleship, 2x cruisers, 3x destroyers, 4x submarines) and an empty
10x10 grid. The grid is square and individual squares in the grid are identified by coordination.

**The Ocean**

1x Battleship 4 Grids

2x Cruisers 3 Grids

3x Destroyers 2 Grids

4x Submarines 1 Grid

**The Fleet**

There are two player in this game, Defender​ and Attacker​. Before game begins, the defender​ secretly
placing the ships on a grid. Each ship occupies a number of consecutive squares on the grid, arranged
either horizontally or vertically​.
The number of squares for each ship is determined by the type of the ship. The ships cannot overlap or
place close to each other (i.e., only one ship can occupy any given square in the grid). These below
pictures are showing the example of legal/illegal ship arrangement.

After the ships have been positioned by the Defender​, the Attacker​ will start to attack by announcing a
target square in the grid which is to be shot. The Attacker​ will attack the ocean until all ships were
sunk (game over).
The list below are the response messages from API based on the current game situation.
- “Miss”​ when it hit nothing.
- “Hit”​ when a ship has been hit (but not sank). do not​ provide the ship-type info.
- “You just sank the ....”​ following with the ship-type. when the ship has been sunk (all squares
of that ship got hit).
- “Game over”​ with a numbers of shots were required​ and missed shots​ from the beginning
of the game until game over.

**API:**

## Get current state 
```
GET /v1/game
```

## Place a ship
```
PUT /v1/fleet/place
```

*request example*
```json
{
	"type": "Battleship",
	"direction": "horizontally", // or vertically
	"x": 1,
	"y": 7
}
```

*response*
```json
{
    "statusCode": 200,
    "code": "SUCCESS",
    "data": {
        "type": "Battleship",
        "status": "placed"
    }
}
```

## Attack
 ```
 POST /v1/battle/attack
 ```

*request example*
```json
{
	"x": 10,
	"y": 8
}
```

## Reset to initial
```
POST /v1/game/reset
```
*response*
```json
{
    "statusCode": 200,
    "code": "SUCCESS",
    "data": {
        "message": "reset successfully"
    }
}
```

## .ENV
```
DB_URI=mongodb://<user>:<password@url:port/database
```

postman: https://www.getpostman.com/collections/fb47c4ffda4117b20d5a