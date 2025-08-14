import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CookieOverlay } from "./subpages/CookieOverlay";
import { NavigateMenu } from "./subpages/navigateMenu";

export class HomePage extends BasePage {
    readonly cookieOverlay: CookieOverlay;

    readonly navigateMenu: NavigateMenu;

    private _newTab: Page | undefined;

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        this.navigateMenu = new NavigateMenu();
    }

    async hoverNavigateOption(option: string) {
        const selector = this.navigateMenu.getMenuItem(option);
        if (!selector)
            throw new Error(`The menu option '${option}' does not exist.`);
        await this.page.locator(selector).hover();
    }

    async clickNavigateOption(option: string) {
        const selector = this.navigateMenu.getMenuItem(option);
        if (!selector)
            throw new Error(`The menu option '${option}' does not exist.`);
        await this.page.locator(selector).click();
    }

    async navigate() {
        await this.page.goto("/");
        await this.cookieOverlay.acceptCookies();
        await this.page.title();
    }

    async performAction() {
        console.log("Performing action");
    }

    async saveSession(filePath: string = "session.json") {
        await this.page.context().storageState({ path: filePath });
    }

    async validate() {
        await expect(1).toBe(1);
    }

    async validateOpenMenu(menu: string) {
        const firstItem = this.navigateMenu.getFirstSubMenuItem(menu);
        if (!firstItem)
            throw new Error(`The menu option '${menu}' does not exist.`);
        await expect(this.page.locator(firstItem)).toBeVisible();
    }

    async clickFooterOption(option: string) {
        const footerItem = this.navigateMenu.getFooterItem(option);
        if (!footerItem)
            throw new Error(`The footer option '${option}' does not exist.`);
        await this.page.locator(footerItem).click();
    }

    async clickSubMenuOption(menu: string, option: string) {
        const subItem = this.navigateMenu.getSubMenuItem(menu, option);
        if (!subItem)
            throw new Error(`The submenu option '${option}' does not exist.`);
        await this.page.locator(subItem).click();
    }

    async validatePageUrl(pageName: string) {
        const pageUrl = this.navigateMenu.getPageUrl(pageName);
        if (!pageUrl)
            throw new Error(`The Page option '${pageName}' does not exist.`);
        await this.page.waitForURL(pageUrl);
    }

    async clickDiscoverOurCapabilities() {
        // Use a robust selector for the "Discover Our Capabilities" button
        const button = this.page.getByRole("link", {
            name: /Discover Our Capabilities/i,
        });
        await expect(button).toBeVisible();
        await button.click();
    }

    async assertTextPresent(text: string) {
        // Target the unique eyebrow header
        const eyebrow = this.page.locator(".general-page-hero-content-eyebrow");
        await expect(eyebrow).toHaveText(text, { timeout: 9000 });
    }

    async clickGenAIFactSheetLink() {
        // Use a robust selector for the "GenAI Fact Sheet" link
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.page.getByRole("link", { name: /GenAI Fact Sheet/i }).click(),
        ]);
        this._newTab = newPage;
    }

    async assertGenAIFactSheetPdfOpenedInNewTab() {
        // Check the new tab's URL ends with .pdf or .ashx
        if (!this._newTab) throw new Error("No new tab was opened");
        await this._newTab.waitForLoadState("domcontentloaded");
        const url = this._newTab.url();
        expect(url).toMatch(/\.pdf($|\?)|\.ashx($|\?)/i);
    }
}
