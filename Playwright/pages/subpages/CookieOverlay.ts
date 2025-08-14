import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CookieOverlay extends BasePage {
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookiesButton = page.getByText("Allow All").first();
    }

    async acceptCookies() {
        if (
            await this.acceptCookiesButton
                .isVisible({ timeout: 2000 })
                .catch(() => false)
        ) {
            await this.acceptCookiesButton.click();
        }
        // else: modal not present, continue
    }
}
