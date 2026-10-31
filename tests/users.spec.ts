import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('Capture Users', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading', { name: '/ User Management' })).toBeVisible();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Users').click();

    const rowCount = await page.getByRole('row').count();
    console.log('Total Rows:', rowCount);

    for (let i = 1; i < rowCount; i++) {
        const user = await page.getByRole('row').nth(i).getByRole('cell').nth(1).textContent();
        console.log('Captured User:', user);
    }
});

test('Capture Employees', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading', { name: '/ User Management' })).toBeVisible();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Users').click();

    const rowCount = await page.getByRole('row').count();
    console.log('Total Rows:', rowCount);

    for (let i = 1; i < rowCount; i++) {
        const employee = await page.getByRole('row').nth(i).getByRole('cell').nth(3).textContent();
        console.log('Capture Employee:', employee);
    }

});