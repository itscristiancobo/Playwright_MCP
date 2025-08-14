Feature: Verify the search feature
    As a user I should be able to search from main page and view the search results.

  @smoke @precondition
  Scenario: Search by word
    Given the user navigates to the Perficient website
    When the user uses the predictive search with "gene" and entire "Generative AI Services"
    Then the user should redirect to "/what-we-do/data-and-intelligence/artificial-intelligence/generative-artificial-intelligence"
