import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";
import { SearchPage } from "@pages/searchPage";

//Actions
When(
    "the user uses the predictive search with {string} and entire {string}",
    async ({ searchPage }, searchKey: string, searchWord: string) => {
        await searchPage.searchFor(searchKey, searchWord);
    }
);

//Expected results
Then(
    "the user should redirect to {string}",
    async ({ searchPage }, searchWord: string) => {
        await searchPage.validateSearchRedirect(searchWord);
    }
);
