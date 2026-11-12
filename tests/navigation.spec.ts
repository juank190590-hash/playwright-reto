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

});

test('Navigate through menu options', async ({ page }) => {
    await page.goto(' https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'username' }).fill('admin');
    await page.getByRole('textbox', { name: 'password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    const menuOptions = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem')
    const expectedMenuOptions = await menuOptions.count()
    //await menuOptions.nth(6).click();

    for (let i = 0; i < expectedMenuOptions; i++) {
        const menuItem = menuOptions.nth(i)
        const menuItemText = await menuItem.innerText()

        console.log('Navigating to menu option', menuItemText)

        /*if (menuItemText !== 'Maintenance') {
            await menuItem.click()
        }*/

        await menuItem.click()

        if (menuItemText === 'Maintenance') {
            await page.goBack();
        }
    }
});

test('Check all the qualification links', async ({ page }) => {

    //const qualificationsMenu = page.getByRole('navigation', { name: 'Topbar Menu'}).getByRole('listitem');
    //const qualificationsText = await qualificationsMenu.allInnerTexts();
    //console.log('Qualifications Text:', qualificationsText);

    /**await page.getByRole('navigation', { name: 'topbar Menu' }).getByText('Skills').click();
    expect(page.url()).toContain('/web/index.php/admin/viewSkills');
    await page.getByRole('navigation', { name: 'topbar Menu' }).getByText('Education').click();
    expect(page.url()).toContain('/web/index.php/admin/viewEducation');
    */

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();

    const qualificationLinks = [
        { name: 'Skills', url: '/web/index.php/admin/viewSkills' },
        { name: 'Education', url: '/web/index.php/admin/viewEducation' },
        { name: 'Licenses', url: '/web/index.php/admin/viewLicenses' },
        { name: 'Languages', url: '/web/index.php/admin/viewLanguages' },
        { name: 'Memberships', url: '/web/index.php/admin/membership' }
    ];

    for (const link of qualificationLinks) {
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();
        const menuItem = page.getByRole('navigation', { name: 'Topbar Menu' }).getByRole('menuitem', { name: link.name });
        await menuItem.click();
        await expect(page).toHaveURL(new RegExp(link.url));
    }

})

test('Check all the configuration links', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible()
    await page.getByRole('link', {name: 'PIM'}).click()
    await expect(page.getByRole('heading', {name: 'PIM'})).toBeVisible()

    const configurationlinks = [
        { name : 'Optional FIelds', url : '/web/index.php/pim/configurePim'},
        { name : 'Custom Fields', url : '/web/index.php/pim/listCustomFields'},
        { name : 'Data Import', url : '/web/index.php/pim/pimCsvImport'},
        { name : 'Reporting Methods', url : '/web/index.php/pim/viewReportingMethods'},
        { name : 'Termination Reasons', url : '/web/index.php/pim/viewTerminationReasons'}
    ]

    for (const link of configurationlinks) {
        const configurationItem = page.getByRole('navigation', {name: 'Topbar Menu'}).getByText('Configuration');
        await configurationItem.click();
        const menuItem = page.getByRole('navigation', { name: 'Topbar Menu'}).getByRole('menuitem', {name: link.name});
        await menuItem.click();
        await expect(page).toHaveURL(new RegExp(link.url));
    }
})


/**test('Login ABM Canales', async ({page}) => {
    await page.goto('https://pre.mediosdepago.transfiriendo.com:61032/Front/login');
    await page.getByRole('textbox', { name: 'Ingresa tu usuario'}).fill('admcolombiaqa');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña'}).fill('"WSXcde3');
    await page.getByRole('button', { name: 'INGRESAR'}).click();
    await expect(page.getByText('Usuarios / Administración de Usuarios')).toBeVisible();

    */