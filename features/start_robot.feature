Feature: Start Robot
  As a user
  I only want the robot to start moving when I want it to
  So it cannot kill me in my sleep

  Scenario: Start moving
    Given the robot is powered on
    When I start the robot
    Then the robot starts moving
