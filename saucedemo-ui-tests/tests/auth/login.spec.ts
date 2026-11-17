import { test, expect } from '@playwright/test';
import { STANDARD_USER } from '../../test-data/users';
test('Login with valid credentials', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill(STANDARD_USER.username);
    await page.getByTestId('password').fill(STANDARD_USER.password);
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
});