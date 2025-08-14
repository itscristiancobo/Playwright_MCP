import { expect } from "@playwright/test";
import { Given, When, Then } from "./fixtures";

Given('the user navigates to the Perficient website', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  const acceptBtn = page.locator('#onetrust-accept-btn-handler');
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
  }
});

When('the user clicks the {string} link in the footer', async ({ page }, linkText: string) => {
  const footer = page.locator('footer');
  await footer.getByRole('link', { name: linkText, exact: true }).click();
});

Then('the user should be redirected to {string}', async ({ page }, expectedPath: string) => {
  await expect(page).toHaveURL(new RegExp(`${expectedPath}$`));
});