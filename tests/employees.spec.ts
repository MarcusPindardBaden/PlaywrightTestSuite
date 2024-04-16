import { test, expect, Page } from '@playwright/test';
import AddEmployeePage from '../pages/addEmployee.page';
import SpecificEmployeePage from '../pages/specificEmployee.page';




test.describe.configure({ mode: 'serial' });

// Employee Details
const allDetailsEmployee = {
    firstname: "Alldetails",
    lastname: "employee",
    staffname: "Alldetails employee",
    email: "pindardbadenmarcus+alldeets@gmail.com",
    number: "01233456789",
    title: "Manager Bee",
};

const keyDetailsEmployee = {
    firstname: "Keydetails",
    lastname: "employee",
    staffname: "Keydetails employee",
    email: "pindardbadenmarcus+keydeets@gmail.com"
};

const missingDetailsEmployee = {
    firstname: "Missing",
    lastname: "Missing",
    email: "pindardbadenmarcus+nodeets@gmail.com"
}


test.beforeEach(async({page}) =>{
    // console.log(process.env.URL);
    await page.goto(process.env.URL);
    await page.getByRole('link', {name: 'Log in'}).click();
    await page.getByLabel('Email address').fill(process.env.EMAIL);
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByRole('button', {name: 'Login'}).click();
    await page.getByTestId('sideBar').getByRole('link', { name: 'Employees' }).click();
})



test('TC-001 User can add employee with all details', async({page})=>{
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.clickAddEmployee();
    await addEmployeePage.addKeyDetails(allDetailsEmployee.firstname,allDetailsEmployee.lastname,allDetailsEmployee.email);
    await addEmployeePage.addExtraDetails(allDetailsEmployee.number, allDetailsEmployee.title);
    await addEmployeePage.saveIt();
    await expect.soft(addEmployeePage.modalTitle()).toBeVisible();
    await addEmployeePage.closeModal();
});




test('TC-002 User can add employee without optional details', async({page}) =>{
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.clickAddEmployee();
    await addEmployeePage.addKeyDetails(keyDetailsEmployee.firstname, keyDetailsEmployee.lastname,keyDetailsEmployee.email);
    await addEmployeePage.saveIt();
    await expect.soft(addEmployeePage.modalTitle()).toBeVisible();
    await addEmployeePage.closeModal();
});



test('TC-003 User cannot add employee with missing first name', async({page}) =>{
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.clickAddEmployee();
    await addEmployeePage.lastNameInput().fill(missingDetailsEmployee.lastname);
    await addEmployeePage.emailInput().fill(missingDetailsEmployee.email);
    await expect.soft(addEmployeePage.saveEmployeeButton()).toBeDisabled();
    await addEmployeePage.closeModal();
});

test('TC-004 User cannot add employee with missing last name', async({page}) =>{
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.clickAddEmployee();
    await addEmployeePage.firstNameInput().fill(missingDetailsEmployee.firstname);
    await addEmployeePage.emailInput().fill(missingDetailsEmployee.email);
    await expect.soft(addEmployeePage.saveEmployeeButton()).toBeDisabled();
    await addEmployeePage.closeModal();
});

test('TC-005 User cannot add employee with missing email', async({page}) =>{
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.clickAddEmployee();
    await addEmployeePage.firstNameInput().fill(missingDetailsEmployee.firstname);
    await addEmployeePage.lastNameInput().fill(missingDetailsEmployee.lastname);
    await expect.soft(addEmployeePage.saveEmployeeButton()).toBeDisabled();
    await addEmployeePage.closeModal();
});


test('TC-006 User can see key details employee', async({page}) =>{
    const specificEmployeePage = new SpecificEmployeePage(page);
    await specificEmployeePage.goToStaffMember(keyDetailsEmployee.staffname);
    await expect.soft(specificEmployeePage.emailAddressField()).toHaveValue(keyDetailsEmployee.email);
});


test('TC-007 User can see all details employee', async({page}) =>{
    const specificEmployeePage = new SpecificEmployeePage(page);
    await specificEmployeePage.goToStaffMember(allDetailsEmployee.staffname);
    await expect.soft(specificEmployeePage.emailAddressField()).toHaveValue(allDetailsEmployee.email);
});


test('User can delete key details employee', async({page}) =>{
    const specificEmployeePage = new SpecificEmployeePage(page);
    await specificEmployeePage.goToStaffMember(keyDetailsEmployee.staffname);
    await specificEmployeePage.deleteEmployee(keyDetailsEmployee.firstname);
    await expect.soft(specificEmployeePage.returnToHubButton()).toBeVisible();
    await specificEmployeePage.goToHub();
});

test('User can delete all details employee', async({page}) =>{
    const specificEmployeePage = new SpecificEmployeePage(page);
    await specificEmployeePage.goToStaffMember(allDetailsEmployee.staffname);
    await specificEmployeePage.deleteEmployee(allDetailsEmployee.firstname);
    await expect.soft(specificEmployeePage.returnToHubButton()).toBeVisible();
    await specificEmployeePage.goToHub();
});


test.afterEach(async({page}) =>{
    await page.getByRole('button', {name: 'Logout'}).click();
    await page.getByRole('link', {name: 'Log in'});
});


