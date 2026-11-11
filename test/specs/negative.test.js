import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ProductsPage from '../pageobjects/products.page.js'

 
describe('[Sauce demo] Negative testing a password', () => {
    beforeEach(async () => {
        
        await LoginPage.open()
    })

    it('should show the username, password and login button on the login page', async () => {
        await expect(LoginPage.inputUsername).toBeDisplayed()
        await expect(LoginPage.inputPassword).toBeDisplayed()
        await expect(LoginPage.btnSubmit).toBeDisplayed()
    })

    it('should show an error message for each user with an incorrect password', async () => {
        const { users } = LoginPage.credentials

        // every user from the login page, INCLUDING locked_out_user 
        for (const user of Object.values(users)) {
            await LoginPage.open()

            await LoginPage.inputUsername.setValue(user)
            await LoginPage.inputPassword.setValue('wrong_password')
            

            await LoginPage.btnSubmit.click()

            await expect(browser).toHaveUrl('https://www.saucedemo.com/')
            await expect(LoginPage.errorMessage).toBeDisplayed()
            await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
        }
    })

    })

