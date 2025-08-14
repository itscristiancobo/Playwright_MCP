import { test as base, createBdd } from "playwright-bdd";
import { HomePage } from "@pages/homePage";
import { ContactPage } from "@pages/contactPage";
import { SearchPage } from '@pages/searchPage';
import fs from "fs";

export type TestData = {
    homePage: HomePage;
    contactPage: ContactPage;
    searchPage: SearchPage;
};

export const test = base.extend<TestData>({
    homePage: async ({ browser }, use) => {
        let context;

        if (fs.existsSync("session.json")) {
            context = await browser.newContext({
                storageState: "session.json",
            });
        } else {
            context = await browser.newContext();
        }
const page = await context.newPage();
    await use(new HomePage(page));
  },
      searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
});
export const { Given, When, Then } = createBdd(test);
