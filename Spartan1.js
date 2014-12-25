function Robot(robot) { }

Robot.prototype.onIdle = function (ev) {
    var me = ev.robot;
    me.turn(5);
};

Robot.prototype.onRobotCollision = function (ev) {
    var me = ev.robot;
    me.move(10, -1);
};

Robot.prototype.onWallCollision = function (ev) { };

Robot.prototype.onScannedRobot = function (ev) {
    var me = ev.robot;
    var target = ev.scannedRobot;

    if (AreEnemies(me, target)) {
        for (var i = 0; i < 5; i++) {
            while (me.gunCoolDown > 0);
            me.fire();
            me.move(5, 1);
        }
    }
};

Robot.prototype.onHitByBullet = function (ev) {
    var robot = ev.robot;

    if (robot.availableDisappears > 0)
        robot.disappear();
    else if (robot.availableClones > 0)
        robot.clone();
    else
        robot.move(10, -1);
};

function CloneMultiplier(robot) {
    if (IsClone(robot))
        return 1;
    else
        return -1;
}

function IsClone(robot) {
    return robot.parentId != null;
}

function IdFriendFoe(robot) {
    if (IsClone(robot))
        return robot.parentId;
    else
        return robot.id;
}

function AreEnemies(robot1, robot2) {
    return IdFriendFoe(robot1) != IdFriendFoe(robot2);
}