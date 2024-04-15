import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) =>{
    await page.goto('https://sandbox-app.brighthr.com/lite');
    await page.getByRole('link', {name: 'Log in'}).click();
    await page.getByLabel('Email address').fill('pindardbadenmarcus+test@gmail.com');
    await page.getByLabel('Password').fill('M@rcusTest12');
    await page.getByRole('button', {name: 'Login'}).click();
    await page.getByRole('link', {name: 'Employees'}).click();
})



// test('User can add employee with all details', async({page})=>{
//     await page.getByRole('button', {name: 'Add employee'}).click();
//     await page.getByLabel('First name').fill('All');
//     await page.getByLabel('Last name').fill('Details');
//     await page.getByLabel('Email address').fill('pindardbadenmarcus+alldeets@gmail.com');
//     await page.getByLabel('Phone number').fill('01233456789');
//     await page.getByTestId('input-selector').click();
//     let today = new Date().toDateString();
//     await page.getByRole('gridcell', {name: today}).click();
//     await page.getByLabel('Job title').fill('Manager Bee');
//     await page.getByRole('button', {name: 'Save new employee'}).click();
//     let modal = await page.getByTestId('background');
//     let modalTitle = await modal.getByRole('heading', {name: 'Success! New employee added'});
//     await expect.soft(modalTitle).toBeVisible();
//     await page.getByRole('button', {name: 'Close modal'}).click();
// });




// test('User can add employee without optional details', async({page}) =>{
//     await page.getByRole('button', {name: 'Add employee'}).click();
//     await page.getByLabel('First name').fill('Key');
//     await page.getByLabel('Last name').fill('Details');
//     await page.getByLabel('Email address').fill('pindardbadenmarcus+keydeets@gmail.com');
//     await page.getByRole('button', {name: 'Save new employee'}).click();
//     let modal = await page.getByTestId('background');
//     let modalTitle = await modal.getByRole('heading', {name: 'Success! New employee added'});
//     await expect.soft(modalTitle).toBeVisible();
//     await page.getByRole('button', {name: 'Close modal'}).click();
// });



// test('User cannot add employee with missing first name', async({page}) =>{
//     await page.getByRole('button', {name: 'Add employee'}).click();
//     await page.getByLabel('Last name').fill('Details');
//     await page.getByLabel('Email address').fill('pindardbadenmarcus+missingdeets@gmail.com');
//     await expect.soft(page.getByRole('button', {name: 'Save new employee'})).toBeDisabled();
//     await page.getByRole('button', {name: 'Close modal'}).click();
// });

// test('User cannot add employee with missing last name', async({page}) =>{
//     await page.getByRole('button', {name: 'Add employee'}).click();
//     await page.getByLabel('First name').fill('Missing');
//     await page.getByLabel('Email address').fill('pindardbadenmarcus+missingdeets@gmail.com');
//     await expect.soft(page.getByRole('button', {name: 'Save new employee'})).toBeDisabled();
//     await page.getByRole('button', {name: 'Close modal'}).click();
// });

// test('User cannot add employee with missing email', async({page}) =>{
//     await page.getByRole('button', {name: 'Add employee'}).click();
//     await page.getByLabel('First name').fill('Missing');
//     await page.getByLabel('Last name').fill('Details');
//     await expect.soft(page.getByRole('button', {name: 'Save new employee'})).toBeDisabled();
//     await page.getByRole('button', {name: 'Close modal'}).click();
// });

test('User can see key details employee', async({page}) =>{
    let card = page.locator('div', {has: page.getByRole('heading', {name: "Key Details"})});
    await card.getByTestId('EditButton').click();
    await expect.soft(page.getByLabel('Email address')).toHaveValue("pindardbadenmarcus+keydeets@gmail.com");
});

// test('User can delete newly created employees', async({page}) =>{

// })


test.afterEach(async({page}) =>{
    await page.getByRole('button', {name: 'Logout'}).click();
    await page.getByRole('link', {name: 'Log in'});
})

