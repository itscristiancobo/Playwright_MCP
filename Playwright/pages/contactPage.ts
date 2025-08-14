import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CookieOverlay } from "./subpages/CookieOverlay";

export class ContactPage extends BasePage {
    readonly cookieOverlay: CookieOverlay;
    readonly contactButton: Locator;
    readonly contactHeader: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly jobTitleInput: Locator;
    readonly companyInput: Locator;
    readonly countrySelect: Locator;
    readonly messageTextarea: Locator;
    readonly subscribeYesRadio: Locator;
    readonly submitButton: Locator;
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly emailError: Locator;
    readonly phoneError: Locator;
    readonly jobTitleError: Locator;
    readonly companyError: Locator;
    readonly countryError: Locator;
    readonly messageError: Locator;
    readonly officeLocationIcon: Locator;
    readonly bogotaButton: Locator;
    readonly officeLocationHeading: Locator;
    readonly officeLocationParagraph: Locator;

    constructor(page: Page) {
        super(page);
        this.cookieOverlay = new CookieOverlay(page);
        this.contactButton = this.page
            .getByRole("link", { name: "Contact" })
            .first();
        this.contactHeader = this.page.locator("h1", {
            hasText: "Get in touch with us.",
        });
        this.firstNameInput = page.getByLabel("First Name");
        this.lastNameInput = page.getByLabel("Last Name");
        this.emailInput = page.getByLabel("Work Email");
        this.phoneInput = page.getByLabel("Phone");
        this.jobTitleInput = page.getByLabel("Job Title");
        this.companyInput = page.getByLabel("Company").first();
        this.countrySelect = page.getByLabel("Country");
        this.messageTextarea = page.getByLabel(
            "How can we help your business?"
        );
        this.subscribeYesRadio = page.getByLabel("Yes, subscribe me.");
        this.submitButton = page.locator('input[type="submit"]');
        this.firstNameError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_3992d3d8-6182-4b16-8be5-a9a7561ccdbe__Value-error"
        );
        this.lastNameError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_06c6dc06-f150-409a-bc0f-94240b2e7368__Value-error"
        );
        this.emailError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_fcc3ab01-3032-42a6-b747-9b73b735090d__Value-error"
        );
        this.phoneError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_56fcbbc7-a2a3-48d4-82bd-799902a5c451__Value-error"
        );
        this.jobTitleError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_5daf3bdc-fb0a-4094-8e51-74813118b3c5__Value-error"
        );
        this.companyError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_7ef78c1c-bb93-440a-8471-018f8eaa78b7__Value-error"
        );
        this.countryError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_39bcad48-dfe0-4a02-a756-9a1114315751__Value-error"
        );
        this.messageError = page.locator(
            "#fxb_707ece81-9a56-434c-9b8a-cfd406a472f7_Fields_517e6f72-eb2c-424a-90d1-9986a543d1ac__Value-error"
        );
        this.officeLocationIcon = this.page
            .locator('svg[data-name="Layer 1"]')
            .nth(2);
        this.bogotaButton = this.page.locator(
            'a[href="/contact/bogota-colombia-edificio-calle-100"]'
        );
        this.officeLocationHeading = this.page.locator("h1.heading-three", {
            hasText: "Bogotá, Colombia",
        });
        this.officeLocationParagraph = this.page.locator(
            "p.location-map-card-content",
            { hasText: "Bogotá, Colombia" }
        );
    }

    async navigateToContactform() {
        await this.page.goto("/");
        await this.cookieOverlay.acceptCookies();
        await this.page.title();
        await this.contactButton.click();
        await this.contactHeader.isVisible();
    }

    async completeContactform() {
        await expect(this.firstNameInput).toBeVisible();
        await this.firstNameInput.fill("John");
        await expect(this.firstNameInput).toHaveValue("John");

        await this.lastNameInput.fill("Doe");
        await expect(this.lastNameInput).toHaveValue("Doe");

        await this.emailInput.fill("john.doe@example.com");
        await expect(this.emailInput).toHaveValue("john.doe@example.com");

        await this.phoneInput.fill("+1234567890");
        await expect(this.phoneInput).toHaveValue("+1234567890");

        await this.jobTitleInput.fill("Software Engineer");
        await expect(this.jobTitleInput).toHaveValue("Software Engineer");

        await this.companyInput.fill("Tech Corp");
        await expect(this.companyInput).toHaveValue("Tech Corp");

        await this.countrySelect.selectOption("Colombia");
        await expect(this.countrySelect).toHaveValue("Colombia");

        await this.messageTextarea.fill(
            "I am interested in learning more about your services."
        );
        await expect(this.messageTextarea).toHaveValue(
            "I am interested in learning more about your services."
        );

        await this.subscribeYesRadio.check();
        await expect(this.subscribeYesRadio).toBeChecked();
    }

    async validateSubmitButton() {
        await expect(this.submitButton).toBeVisible();
    }

    async validateErrorMessages() {
        await expect(this.firstNameError).toBeVisible();
        await expect(this.firstNameError).toHaveText("First Name is required.");
        await expect(this.lastNameError).toBeVisible();
        await expect(this.lastNameError).toHaveText("Last Name is required.");
        await expect(this.emailError).toBeVisible();
        await expect(this.emailError).toHaveText("Work Email is required.");
        await expect(this.phoneError).toBeVisible();
        await expect(this.phoneError).toHaveText("Phone is required.");
        await expect(this.jobTitleError).toBeVisible();
        await expect(this.jobTitleError).toHaveText("Job Title is required.");
        await expect(this.companyError).toBeVisible();
        await expect(this.companyError).toHaveText("Company is required.");
        await expect(this.countryError).toBeVisible();
        await expect(this.countryError).toHaveText("Country is required.");
        await expect(this.messageError).toBeVisible();
        await expect(this.messageError).toHaveText(
            "How can we help your business? is required."
        );
    }

    async submitFormWithoutFillingFields() {
        await this.submitButton.click();
    }

    async findOfficeLocation() {
        await this.officeLocationIcon.click();
        await this.bogotaButton.click();
    }

    async validateOfficeLocation() {
        await expect(this.officeLocationHeading).toBeVisible();
        await expect(this.officeLocationParagraph).toBeVisible();
        await expect(this.officeLocationParagraph).toHaveText(
            /Bogotá, Colombia|Edificio Calle 100|Piso 11/
        );
    }
}
