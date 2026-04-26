import {Page, Locator} from '@playwright/test'

export class LoginPage {

    readonly baseUrl = 'https://the-internet.herokuapp.com/login'
    readonly headerPageLocator : Locator
    readonly inputUsernameLocator : Locator
    readonly inputPasswordLocator : Locator
    readonly loginBtn : Locator



    constructor(private page : Page) {
        this.headerPageLocator = page.getByText('Login Page')
        this.inputUsernameLocator = page.locator('#username')
        this.inputPasswordLocator = page.locator('#password')
        this.loginBtn = page.locator('button[type="submit"]') 

    }

    async goto() {
        await this.page.goto(this.baseUrl)
    }

    async filluserName(username : string) {
        await this.inputUsernameLocator.fill(username)
    }

    async fillPassword(password : string) {
        await this.inputPasswordLocator.fill(password)
    }

    async clickloginBtn() {
        await this.loginBtn.click()
    }
}