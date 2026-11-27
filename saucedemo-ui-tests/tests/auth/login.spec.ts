import { test, expect } from '@playwright/test';
import { STANDARD_USER, LOCKED_OUT_USER, INVALID_PASSWORD_USER } from '../../test-data/users';

test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Login with valid credentials', async ({ page }) => {
        await page.getByTestId('username').fill(STANDARD_USER.username);
        await page.getByTestId('password').fill(STANDARD_USER.password);
        await page.getByTestId('login-button').click();
        await expect(page).toHaveURL('/inventory.html');
        await expect(page.getByTestId('title')).toHaveText('Products');
    });

    test('Locked out user cannot login', async ({ page }) => {
        await page.getByTestId('username').fill(LOCKED_OUT_USER.username);
        await page.getByTestId('password').fill(LOCKED_OUT_USER.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('error')).toContainText('locked out');
        await expect(page).toHaveURL('/');
    });

    test('Wrong password shows error', async ({ page }) => {
        await page.getByTestId('username').fill(INVALID_PASSWORD_USER.username);
        await page.getByTestId('password').fill(INVALID_PASSWORD_USER.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('error')).toContainText('do not match');
        await expect(page).toHaveURL('/');
    });

    test('Empty username shows error', async ({ page }) => {
        await page.getByTestId('password').fill(STANDARD_USER.password);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('error')).toContainText('Username is required');
        await expect(page).toHaveURL('/');
    });

    test('Empty password shows error', async ({ page }) => {
        await page.getByTestId('username').fill(STANDARD_USER.username);
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('error')).toContainText('Password is required');
        await expect(page).toHaveURL('/');
    });

});
