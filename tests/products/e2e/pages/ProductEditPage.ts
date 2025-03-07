import { Page } from "@playwright/test";

export class ProductEditPage {

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }


    async setName(name : string){
        const inputField = this.page.getByTestId('name');
        await inputField.fill(name);
    }

    async setDescription(description : string){
        await this.page.getByPlaceholder('Ex. It makes me feel...').fill(description);
    }

    assertName(name : string){

    }

    assertDescription(description : string){

    }

    async doSave() {
        await this.page.click('text=Submit');
    }

    doCancel() {

    }

}