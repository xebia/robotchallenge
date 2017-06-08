Feature: Follow line
  As a Test Master
  I want my robot to follow a black line
  So it can navigate a course

  Scenario: Robot travels straight on the track
    Given the robot is traveling on the course
    When the robot stays on track
    Then the robot doesn’t steer

  Scenario: Robot travels right off the track
    Given the robot is traveling on the course
    When the robot goes off the course of the right side
    Then the robot steers to the left

  Scenario: Robot travels left off the track
    Given the robot is traveling on the course
    When the robot goes off the course of the left side
    Then the robot steers to the right
