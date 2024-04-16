import { expect, Page} from '@playwright/test';

export default class SpecificEmployeePage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators
    card = (staffName)=> this.page.locator('div[class="flex items-center justify-between py-2 bg-white border border-gray-200 rounded-lg shadow-md"]', {has: this.page.getByRole('heading', {name: staffName})}).first();
    editButton = (staffName)=> this.card(staffName).getByTestId('EditButton');
    emailAddressField = ()=> this.page.getByLabel('Email address');
    employeeRecordTab = () => this.page.getByRole('link', {name: 'Delete employee record'});
    checkBox = ()=> this.page.getByRole('checkbox');
    deleteButton = (firstName)=> this.page.getByRole('button', {name: 'Delete '+firstName});
    returnToHubButton = () => this.page.getByRole('button', {name: 'Return to employee hub'});

    // Methods
    public async goToStaffMember(staffName){
        await this.editButton(staffName).click();
    }

    public async returnEmail(){
        const email = await this.emailAddressField();
        return email.textContent();
    }

    public async deleteEmployee(firstName){
        await this.employeeRecordTab().click();
        await this.checkBox().dispatchEvent("click");
        await this.deleteButton(firstName).click();
    }

    public async deleteConfirmation(){
        const message = await this.returnToHubButton();
        return message.isVisible();
    }

    public async goToHub(){
        await this.returnToHubButton().click();
    }
}