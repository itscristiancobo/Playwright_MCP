# Playwright Test Framework Structure

## Directory Structure

```
- Playwright/
  - features/
    - company_navigation.feature
    - search.feature
    - vehicle_customization.feature
    - vehicle_navigation.feature
  - hooks/
    - hooks.ts
  - pages/
    - BasePage.ts
    - homePage.ts
    - vehicleDetailsPage.ts
    - subpages/
      - CookieOverlay.ts
  - state/
    - scenarioData.ts
  - steps/
    - fixtures.ts
    - homeSteps.ts
    - vehicleSteps.ts
- .gitignore
- architecture.jpg
- package-lock.json
- package.json
- playwright.config.ts
- README.md
- Runner.ts
- tsconfig.json
- typedoc.json
```

## Directory and File Explanations

### Root Directory Files

- **package.json**: Contains project dependencies and scripts. The project uses `playwright-bdd` for BDD-style testing with Playwright. Key dependencies include `@playwright/test`, `playwright-bdd`, and TypeScript.

- **playwright.config.ts**: Configuration file for Playwright tests. Defines test directory, BDD features and steps locations, browser configurations, and reporting options. Supports multiple browser configurations including Chromium, WebKit, and mobile browsers.

- **Runner.ts**: A utility script that allows running tests with specific tags from the command line. It constructs a command to run Playwright tests with the provided tags.

### Playwright Directory

#### features/

Contains Gherkin feature files that define test scenarios in a human-readable format using Given-When-Then syntax. Test Cases MUST be written in this format without exception. Files in "steps" contain available steps to perform actions, for example, in the steps, "Given("user is on the home page", async ({homePage}) => { await homePage.navigate() });", the only text necessary in the feature file is "Given user is on the home page".

- **company_navigation.feature**: Tests navigation through different company menu sections (Philosophy, Sustainability, Innovation, etc.) and verifies that each page loads correctly.

- **search.feature**: Tests vehicle search functionality, including searching for specific vehicles, displaying results, and clearing search terms.

- **vehicle_customization.feature**: Tests vehicle customization features, allowing users to customize interior and exterior options of different vehicle models. Includes scenarios for changing interior colors, selecting wheels, viewing 360° previews, and exploring interior features.

- **vehicle_navigation.feature**: Tests navigation to vehicle detail pages from search results for different vehicle models.

#### hooks/

Contains setup and teardown code that runs before or after test scenarios.

- **hooks.ts**: Defines hooks that run before and after scenarios with specific tags. Uses the `BeforeScenario` and `AfterScenario` functions from `playwright-bdd`.

#### pages/

Implements the Page Object Model pattern, encapsulating page elements and actions.

- **BasePage.ts**: Base class for all page objects. Provides common utility methods like getting text from elements and selecting random elements.

- **homePage.ts**: Represents the home page with methods for navigation, searching for vehicles, selecting results, and navigating through company sections. Contains locators for page elements.

- **vehicleDetailsPage.ts**: Represents the vehicle details page with methods for customizing vehicles, selecting design options, and validating visual changes. Includes complex interactions like 360° view manipulation.

- **subpages/CookieOverlay.ts**: Represents a cookie consent overlay that appears on pages, with a method to accept cookies.

#### state/

Manages state and data sharing between test steps.

- **scenarioData.ts**: Provides a mechanism to store and retrieve data during test execution. Uses a Map to store key-value pairs that can be accessed across different test steps.

#### steps/

Contains step definitions that map Gherkin steps to actual code implementation.

- **fixtures.ts**: Sets up test fixtures and exports the Given, When, Then functions from `playwright-bdd`. Creates and provides instances of page objects and the scenario data class.

- **homeSteps.ts**: Implements step definitions related to the home page, including navigation, search, and company menu interactions.

- **vehicleSteps.ts**: Implements step definitions related to vehicle customization and details pages, including selecting design options and validating visual changes.

## Framework Architecture

This framework follows a BDD (Behavior-Driven Development) approach using Cucumber syntax with Playwright for browser automation. It implements several design patterns:

1. **Page Object Model (POM)**: Encapsulates page elements and actions in page classes, making tests more maintainable and reducing duplication.

2. **Fixtures**: Uses Playwright's fixture mechanism to provide page objects and other dependencies to test steps.

3. **Step Definitions**: Maps Gherkin steps to actual code implementation, bridging the gap between human-readable scenarios and automation code.

4. **Hooks**: Provides a mechanism for setup and teardown operations before and after scenarios.

5. **State Management**: Uses a dedicated class for sharing data between test steps.

6. **Composition**: Uses composition to include sub-components (like CookieOverlay) within page objects.

## Test Execution

Tests can be executed using the npm script defined in package.json:

```bash
npm test
```

This runs the `bddgen` command to generate test files from feature files, then executes the tests using Playwright.

Specific scenarios can be run using tags with the Runner.ts script:

```bash
node Runner.ts @smoke
```

## Reporting

The framework generates HTML reports for test runs, with the report file named based on the current date:

```
cucumber-report/report_YYYY-MM-DD.html
```

## Configuration

The framework supports multiple browsers and device configurations as defined in playwright.config.ts:
- Chromium
- WebKit (Desktop Safari)
- Mobile Android (Pixel 5)
- Mobile Safari (iPhone 15 Pro Max)

Tests can be configured to capture videos, screenshots, and traces for debugging failed tests.
