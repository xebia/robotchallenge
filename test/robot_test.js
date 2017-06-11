require('./test_helper');

describe("the robot", function(){

  it("will become active when activated", function() {
    this.robot.activate();
    assert(this.robot.getState(), "robot is not activated");
  });

  it("will go forward when asked", function() {
    this.robot.goForward();
    assert(this.moveSpy.withArgs(1,1), "robot has not moved forward correctly");
  });

  it("will become inactive when stopped", function() {
    this.robot.activate();
    assert(this.robot.getState(), "robot is not activated");
    this.robot.stop();
    assert(this.robot.getState() === false, "robot is still active");
  });

  it("will turn on lights when asked", function() {
    this.robot.activate();
    this.robot.turnOnLights();
    assert(this.robot.lightStatus === true, "robot has not turned on lights");
  });

  it("will turn off all lights when asked, even if it was celebrating", function() {
    this.robot.activate();
    this.robot.celebrate();
    this.robot.turnOffLights();
    assert(this.robot.lightStatus === false, "robot has not turned off lights");
  });

  it("can celebrate", function() {
    this.robot.celebrate();
    assert(this.robot.celebrating, "robot is not celebrating");
  });

  describe("robot error handling", function(){
    it("can throw errors if incorrect values are passed to the wheels", function() {
      this.robot.activate();
      var robot = this.robot;

      assert.throws(function() {
        robot.left(2)
      }, Error, "supplied speed must be between -1 and 1");
    });

    it("can throw errors if incorrect values are passed to the wheels", function() {
      this.robot.activate();
      var robot = this.robot;

      assert.throws(function() {
        robot.right(2)
      }, Error, "supplied speed must be between -1 and 1");
    });
  });
});