require('./test_helper');

describe("the finish feature", function(){
    it("does not do anything if the robot is not activated", function() {
      this.finish.sensorChange(1.9, this.robot);
      assert(this.robot.celebrating === undefined, "robot should not be celebrating");
    });
  });