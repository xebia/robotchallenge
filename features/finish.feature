Feature: Stop at Finish
  As a user
  I want my robot to stop moving at the finish
  So it doesn't go of course

  Scenario: The robot can stop at the finish
    Given the robot is traveling on the course
    When the robot encounters the finish
    Then the robot stops

  Scenario: The robot doesn't stop before the finish
    Given the robot is traveling on the course
    When the robot hasn't reached the finish yet
    Then the robot hasn't stopped