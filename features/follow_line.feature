Feature: Follow Line
  As a user
  I want my robot to follow a black line
  So it can navigate a course

  Scenario Outline: Steer to follow a Line
    Given the robot is traveling on the course
    When the robot goes off the course of the <side>
    Then the robot steers to the <direction>

  Examples:
    | side   | direction |
    | left   | right     |
    | right  | left      |

  Scenario: Go straight to follow a Line
    Given the robot is not entirely on course
    When the robot returns to the course
    Then the robot goes straight

  Scenario Outline: Follow the line through a sharp corner
    Given the robot encounters a sharp corner
    When the robot finds the angle of the <direction> corner
    Then the robot takes a <direction> corner

      Examples:
    | direction |
    | right     |
    | left      |