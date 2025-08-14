import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CookieOverlay } from "./subpages/CookieOverlay";

export class SearchPage extends BasePage {
    readonly cookieOverlay: CookieOverlay;
    readonly searchBtn: Locator;
    readonly searchBox: Locator;
    readonly topicsList: Locator;

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        this.searchBtn = page.locator(".icon-search");
        this.searchBox = page.locator("[aria-label*='Submit search']");
        this.topicsList = page.locator(".search-trending-topics-link");
    }

    async searchFor(searchKey: string, searchWord: string) {
        await this.searchBtn.click();
        await this.searchBox.pressSequentially(searchKey);
        await this.searchBox.press("Tab");
        const topicsCount = await this.topicsList.count();
        for (let i = 0; i < topicsCount; ++i) {
            const text = await this.topicsList.nth(i).textContent();
            if ((text ?? "").trim() === searchWord) {
                await this.topicsList.nth(i).click();
                break;
            }
        }
    }

    async validateSearchRedirect(textResult: string) {
        await expect(this.page).toHaveURL(new RegExp(`${textResult}$`));
    }
}
