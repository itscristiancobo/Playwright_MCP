Feature: Mock Feature
    As a user I should be able to search vehicles

  @smoke @precondition
  Scenario: Mock scenario
    Given the user is on the home page
    When I perform an action
    Then I expect an outcome

  @genai
  Scenario: Validate GenAI Capabilities and Fact Sheet PDF
    Given the user is on the home page
    When the user clicks the "Discover Our Capabilities" button
    Then the page contains the text "Generative artificial Intelligence"
    When the user clicks the "GenAI Fact Sheet" link
    Then the GenAI Fact Sheet PDF is opened in a new tab
