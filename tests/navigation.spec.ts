import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('Check left menu options', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    const menuOptions = await page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem').count();
    console.log('Total Menu Options:', menuOptions);

    for (let i = 0; i < menuOptions; i++) {
        const menuItem = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem').nth(i);
        const menuItemText = await menuItem.innerText();
        
        console.log(menuItemText);
    }

    const expectedMenuOptions = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];

    expect(menuOptions).toBe(expectedMenuOptions.length);
    expect(page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem').nth(1)).toHaveText('Tesmon');


/**test('Login ABM Canales', async ({page}) => {
    await page.goto('https://pre.mediosdepago.transfiriendo.com:61032/Front/login');
    await page.getByRole('textbox', { name: 'Ingresa tu usuario'}).fill('admcolombiaqa');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña'}).fill('"WSXcde3');
    await page.getByRole('button', { name: 'INGRESAR'}).click();
    await expect(page.getByText('Usuarios / Administración de Usuarios')).toBeVisible();

    */
});