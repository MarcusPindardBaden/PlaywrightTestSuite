import { expect, Page} from '@playwright/test';

export default class AddEmployeePage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }
    

    // Locators
    addEmployeeButton = ()=> this.page.getByRole('button', {name: 'Add employee'})
    dateDropdown = ()=> this.page.getByTestId('input-selector');
    firstNameInput = ()=> this.page.getByLabel('First name');
    lastNameInput = ()=> this.page.getByLabel('Last name');
    emailInput = ()=> this.page.getByLabel('Email address');
    numberInput = ()=> this.page.getByLabel('Phone number');
    jobTitleInput = ()=> this.page.getByLabel('Job title');
    saveEmployeeButton = ()=> this.page.getByRole('button', {name: 'Save new employee'})
    modal = ()=> this.page.getByTestId('background');
    closeModalButton = ()=> this.page.getByRole('button', {name: 'Close modal'});
    modalTitle = () => this.modal().getByRole('heading', {name: 'Success! New employee added'});

    // Methods
    public async clickAddEmployee(){
        await this.addEmployeeButton().click();
    }

    public async pickADate(){
        await this.dateDropdown().click();
        let today = new Date().toDateString();
        await this.page.getByRole('gridcell',{name: today}).click();
    }

    public async addKeyDetails(firstname, lastname, email){
        await this.firstNameInput().fill(firstname);
        await this.lastNameInput().fill(lastname);
        await this.emailInput().fill(email);
    }

    public async addExtraDetails(phone, title){
        await this.numberInput().fill(phone);
        await this.pickADate();
        await this.jobTitleInput().fill(title);
    }

    public async saveIt(){
        await this.saveEmployeeButton().click();
    }

    public async checkSuccessMessage(){
        const message = await this.modalTitle();
        return message.isVisible();
    }

    public async closeModal(){
        await this.closeModalButton().click()
    }

}