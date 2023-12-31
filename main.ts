enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Dead
}
namespace SpriteKind {
    export const Ground = SpriteKind.create()
    export const Cloud = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    mySprite.setImage(assets.image`Dead`)
    pause(100)
    game.setGameOverMessage(true, "GAME OVER!")
    game.gameOver(true)
})
let cloud: Sprite = null
let cactus: Sprite = null
let choice = 0
let mySprite: Sprite = null
game.splash("T-Rex Run")
scene.setBackgroundColor(1)
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`bg`)
scroller.scrollBackgroundWithSpeed(-70, 0, scroller.BackgroundLayer.Layer0)
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(assets.image`tRex`, SpriteKind.Player)
mySprite.setPosition(20, 80)
mySprite.z = 1
animation.runImageAnimation(
mySprite,
assets.animation`tRexmyAnim`,
50,
true
)
mySprite.ay = 500
info.setScore(0)
game.showLongText("Press any button to jump.", DialogLayout.Top)
game.onUpdateInterval(50, function () {
    info.changeScoreBy(1)
})
game.onUpdateInterval(1500, function () {
    choice = randint(0, 4)
    if (choice == 0) {
        cactus = sprites.createProjectileFromSide(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ..............bbb...............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb...b..........
            .........b...bbbbb..bbb.........
            ........bbb..bbbbb..bbb.........
            ........bbb..bbbbb..bbb.........
            ........bbb..bbbbb..bbb.........
            ........bbbbbbbbbb..bbb.........
            ........bbbbbbbbbb..bbb.........
            .........bbbbbbbbbbbbbb.........
            .............bbbbbbbbbb.........
            .............bbbbbbbbb..........
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            `, -70, 0)
        cactus.y = 79
    } else if (choice == 1) {
        cactus = sprites.createProjectileFromSide(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ..............bbb...............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .........b...bbbbb...b..........
            ........bbb..bbbbb..bbb.........
            ........bbb..bbbbb..bbb.........
            ........bbb..bbbbb..bbb.........
            ........bbb..bbbbbbbbbb.........
            ........bbb..bbbbbbbbbb.........
            ........bbbbbbbbbbbbbb..........
            ........bbbbbbbbbb..............
            .........bbbbbbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            .............bbbbb..............
            `, -70, 0)
        cactus.y = 79
    } else if (choice == 2) {
        cactus = sprites.createProjectileFromSide(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...........b....................
            ..........bbb...................
            ..........bbb......b............
            ........b.bbb.....bbb...........
            ........b.bbb.....bbb.b.........
            ........bbbbb.b...bbb.b.........
            ..........bbb.b.b.bbbbb.........
            ..........bbbbb.b.bbb...........
            ..........bbb...bbbbb...........
            ..........bbb.....bbb...........
            ..........bbb.....bbb...........
            ..........bbb.....bbb...........
            `, -70, 0)
        cactus.y = 79
    }
})
game.onUpdateInterval(1500, function () {
    if (Math.percentChance(40)) {
        cloud = sprites.createProjectileFromSide(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................dddd.dd.........
            ...............dd.....d.........
            .............ddd......ddd.......
            .............d..........dddd....
            .............d.............d....
            ..........dddd.............ddd..
            .........dd..................d..
            .....ddddd...................dd.
            .....d........................d.
            .dd.dd..d......................d
            dd.......ddddddddddddddddddddddd
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            `, -20, 0)
        cloud.y = randint(20, 60)
        cloud.setKind(SpriteKind.Cloud)
    }
})
