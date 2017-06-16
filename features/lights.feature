Feature: Turn on lights
  As a user
  I want my robot to turn on its lights in the dark
  So it keeps to the traffic rules

  Scenario: When it turns dark, the robot switches on lights
    Given the robot is traveling on the course
    When it turns dark
    Then robot turns on its lights

  Scenario: When it turns light, the robot switches off lights
    Given the robot is traveling on the course in the dark
    When its no longer dark
    Then robot turns off its lights