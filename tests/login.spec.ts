import {test} from '@playwright/test';
import {expect} from '@playwright/test';

test('Login OrangeHRM', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username'}).fill('Admin');
    await page.getByRole('textbox', { name: 'Password'}).fill('admin123');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.getByRole('heading', { name: 'Dashboard'})).toBeVisible();
});

test('login OrangeHRM with invalid credentials', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'username'}).fill('admin');
    await page.getByRole('textbox', { name: 'password'}).fill('Hola');
    await page.getByRole('button', { name: 'login'}).click();
    //await expect(page.getByRole('alert')).toContainText('Invalid credentials');
    //await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});