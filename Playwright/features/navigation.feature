Feature: Navigation Feature

  @smoke
  Scenario: Who We Are Menu Options
    Given the user is on the home page
    When the user hover on 'Who We Are' menu
    Then the menu 'Who We Are' expands
    When the user clicks on 'Partners' on menu 'Who We Are'
    Then the 'Partners' page is displayed
    When the user hover on 'Who We Are' menu
    Then the menu 'Who We Are' expands
    When the user clicks on 'Leadership' on menu 'Who We Are'
    Then the 'Leadership' page is displayed

  @smoke
  Scenario Outline: Whe We Are Menu
    Given the user is on the home page
    When the user hover on "<menu_option>" menu
    Then the menu "<menu_option>" expands
    When the user clicks on "<submenu>" on menu "<menu_option>"
    Then the "<page>" page is displayed

    Examples:
      | menu_option              | submenu                     | page                        |
      | Who We Are               | Partners                    | Partners                    |
      | Who We Are               | Leadership                  | Leadership                  |
      | What We Do               | Strategy And Transformation | Strategy And Transformation |
      | Industries And Functions | Commerce                    | Commerce                    |
      | Industries And Functions | Automotive                  | Automotive                  |
      | Insights                 | Blogs                       | Blogs                       |

  @smoke
  Scenario Outline: Footer menu
    Given the user is on the home page
    When the user clicks on "<page>" footer
    Then the "<page>" page is displayed

    Examples:
      | page        |
      | Who We Are  |
      | What We Do |
      | Blogs       |
      | Insights    |
