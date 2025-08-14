Feature: Verify navigation through footer links

  @smoke @precondition
  Scenario: Validate 'Who We Are' link
    Given the user navigates to the Perficient website
    When the user clicks the "Who We Are" link in the footer
    Then the user should be redirected to "/who-we-are"

  @smoke @precondition
  Scenario: Validate 'What We Do' link
    Given the user navigates to the Perficient website
    When the user clicks the "What We Do" link in the footer
    Then the user should be redirected to "/what-we-do"

  @smoke @precondition
  Scenario: Validate 'Insights' link
    Given the user navigates to the Perficient website
    When the user clicks the "Insights" link in the footer
    Then the user should be redirected to "/insights"
    
       