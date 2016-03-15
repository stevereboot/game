// public/app/main/main.service.js

var mainSvc = angular.module('main.service', []);

mainSvc.service('mainService', [
	function() {

            this.startGame = function() {
                var game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
                    { preload: preload, create: create, update: update });
                
                function preload() {
                    game.load.image('sky', '../../img/game/assets/sky.png');
                    game.load.image('ground', '../../img/game/assets/platform.png');
                    game.load.image('star', '../../img/game/assets/star.png');
                    game.load.image('lobby', '../../img/game/assets/lobby.png');
                    game.load.spritesheet('superman', '../../img/game/assets/superman-bit.png', 16, 20);
                    game.load.spritesheet('batman', '../../img/game/assets/batman-bit.png', 16, 20);
                    game.load.spritesheet('securityGuard', '../../img/game/assets/security-guard-bit.png', 16, 20);
                }

                // Variables used in both create and update
                var platforms;
                var player;
                var stars;
                var cursors;

                var score = 0;
                var scoreText;

                function create() {
                    game.physics.startSystem(Phaser.Physics.ARCADE);

                    // Sky
                    game.add.sprite(0, 0, 'sky');

                    console.log(game.world.height);

                    var lobby = game.add.sprite(0, game.world.height - 112 - 64, 'lobby');
                    lobby.smoothed = false;
                    lobby.scale.setTo(2, 2);

                    // Ground and platforms
                    platforms = game.add.group();
                    platforms.enableBody = true;

                    var ground = platforms.create(0, game.world.height - 64, 'ground');
                    ground.scale.setTo(2, 2);
                    ground.body.immovable = true;

                    var ledge = platforms.create(400, 400, 'ground');
                    ledge.body.immovable = true;

                    ledge = platforms.create(-150, 250, 'ground');
                    ledge.body.immovable = true;

                    // Player
                    player = game.add.sprite(16, game.world.height - 150, 'securityGuard');
                    player.scale.setTo(2, 2);
                    player.smoothed = false;
                    player.frame = 3;

                    game.physics.arcade.enable(player);
                    player.body.bounce.y = 0.2;
                    player.body.gravity.y = 300;
                    player.body.collideWorldBounds = true;

                    // Player animations
                    player.animations.add('left', [0, 1], 10, true);
                    player.animations.add('right', [3, 4], 10, true);

                    // Stars
                    stars = game.add.group();
                    stars.enableBody = true;

                    for (var i = 0; i < 12; i++) {
                        var star = stars.create(i * 70, 0, 'star');
                        star.body.gravity.y = 300;
                        star.body.bounce.y = 0.7 * Math.random() * 0.2;
                    }

                    // Score
                    scoreText = game.add.text(16, 16, 'Score: 0', {
                        fontSize: '32px',
                        fill: '#000'
                    });

                    // Keyboard controls
                    cursors = game.input.keyboard.createCursorKeys();
                    spaceBar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
                }

                function update() {
                    game.physics.arcade.collide(player, platforms);
                    game.physics.arcade.collide(stars, platforms);

                    game.physics.arcade.overlap(player, stars, collectStar, null, this);

                    player.body.velocity.x = 0;
                    
                    if (cursors.left.isDown) {
                        // Move left
                        player.body.velocity.x = -150;
                        player.animations.play('left');
                    } else if (cursors.right.isDown) {
                        // Move right
                        player.body.velocity.x = 150;
                        player.animations.play('right');
                    } else {
                        player.animations.stop();
//                        player.frame = 2;
                    }
                    
                    if (spaceBar.isDown && player.body.touching.down) {
                        player.body.velocity.y = -350;
                    }


                }
                
                function collectStar(player, star) {
                    star.kill();

                    // Update score
                    score += 10;
                    scoreText.text = 'Score: ' + score;
                }

            }
		
	}
]);
