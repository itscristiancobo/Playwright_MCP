import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";

//Actions
When("I save session", async ({ homePage }, term: string) => {
    await homePage.saveSession();
});