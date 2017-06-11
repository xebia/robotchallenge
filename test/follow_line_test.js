require('./test_helper');

describe("the follow line feature", function(){
    it("does not do anything if the robot is not activated", function() {
      this.followLine.sensorChange("right",1, this.robot);
      
      assert(this.moveSpy.callCount === 0, "robot has incorrectly started moving");
    });

    it("can move forward once the both sensors find black", function() {
      this.robot.activate();
      this.followLine.sensorChange("right",0, this.robot);
      this.followLine.sensorChange("left",0, this.robot);
      assert(this.moveSpy.withArgs(1,1), "robot has not moved forward correctly");
    });

    it("can throw errors if incorrect direction parameters are received from the sensors", function() {
      this.robot.activate();
      var followLine = this.followLine;

      assert.throws(function() {
        followLine.sensorChange("center",1, this.robot)
      }, Error, "direction must be left or right");
    });

    it("can throw errors if incorrect values are received from the sensors", function() {
      this.robot.activate();
      var followLine = this.followLine;

      assert.throws(function() {
        followLine.sensorChange("right",2, this.robot)
      }, Error, "no correct value found");
    });
  });