require('./test_helper');

describe("the automated lights feature", function(){
    it("does not do anything if the robot is not activated", function() {
      this.automatedLight.sensorChange(1, this.robot);
      assert(this.robot.lightStatus === false, "robot has incorrectly turned on lights");
    });
  });