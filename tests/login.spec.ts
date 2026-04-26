import {expect, test} from '@playwright/test'
import {LoginPage} from '../page/login.page'
import {loginSuccess, loginPasswordFailed, loginUsernameNotfound} from '../datatest/loginData'


let loginPage : LoginPage



    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()

    })

            test('Login success' , async ({page}) => {
                await loginPage.filluserName(loginSuccess[0].username)
                await loginPage.fillPassword(loginSuccess[0].password)
                await loginPage.clickloginBtn()

                await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure')
                await expect(page.locator('#flash')).toContainText('You logged into a secure area!')                
                await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.')                
                await expect(page.getByRole('link', { name: 'Logout' })).toHaveClass(/button secondary radius/)


                // logout
                await page.getByRole('link', { name: 'Logout' }).click()

                await expect(page).toHaveURL('https://the-internet.herokuapp.com/login')
                await expect(page.locator('#flash')).toContainText('You logged out of the secure area!')

            })


            test('Login failed - Password incorrect' , async ({page}) => {
                await loginPage.filluserName(loginPasswordFailed[0].username)
                await loginPage.fillPassword(loginPasswordFailed[0].password)
                await loginPage.clickloginBtn()

                await expect(page.locator('#flash')).toContainText('Your password is invalid!')
            })


            test('Login failed - Username not found' , async ({page}) => {
                await loginPage.filluserName(loginUsernameNotfound[0].username)
                await loginPage.fillPassword(loginUsernameNotfound[0].password)
                await loginPage.clickloginBtn()

                await expect(page.locator('#flash')).toContainText('Your username is invalid!')
            })





    