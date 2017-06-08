Feature: Control button
  As a Test Master 
  I want to be able to start and stop my robot 
  So my robot doesn't go rogue and take over the world

  Scenario: The robot starts traveling when the button is pressed
    Given the robot is standing still on the course
    When I press the power button 
    Then the robot starts going forward

  Scenario: The robot stops traveling when the button is pressed
    Given the robot is traveling on the course 
    When I press the power button 
    Then the robot stops
