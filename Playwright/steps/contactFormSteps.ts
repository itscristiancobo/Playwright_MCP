import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";

Given("the user navigate to contact form page", async ({ contactPage }) => {
    await contactPage.navigateToContactform();
});

When("the user complete the contact form", async ({ contactPage }) => {
    await contactPage.completeContactform();
});

When(
    "the user tries to submit the form without filling any fields",
    async ({ contactPage }) => {
        await contactPage.submitFormWithoutFillingFields();
    }
);

When("the user search for an office location", async ({ contactPage }) => {
    await contactPage.findOfficeLocation();
});

Then(
    "the error messages are displayed for each required field",
    async ({ contactPage }) => {
        await contactPage.validateErrorMessages();
    }
);

Then("the form is complete", async ({ contactPage }) => {
    await contactPage.validateSubmitButton();
});

Then("the office location Bogota is displayed", async ({ contactPage }) => {
    await contactPage.validateOfficeLocation();
});
