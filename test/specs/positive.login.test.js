import { expect, browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ProductsPage from '../pageobjects/products.page.js'

 
describe('[Sauce demo] Positive testing a user', () => {
    beforeEach(async () => {
        
        await browser.deleteCookies()
        await LoginPage.open()
    })

    it('should show the username, password and login button on the login page', async () => {
        await expect(LoginPage.inputUsername).toBeDisplayed()
        await expect(LoginPage.inputPassword).toBeDisplayed()
        await expect(LoginPage.btnSubmit).toBeDisplayed()
    })

    it('should log in each user (except locked_out_user) one after another and display the Products page', async () => {
        const { users, password } = LoginPage.credentials

        // logs in every user from the login page except locked_out_user
        const validUsers = Object.values(users).filter(user => user !== users.lockedOut)

        for (const user of validUsers) {
            await LoginPage.open()

            await LoginPage.inputUsername.setValue(user)
            await LoginPage.inputPassword.setValue(password)
            await LoginPage.btnSubmit.click()

            await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'))
            await expect(ProductsPage.title).toHaveText('Products')
            await expect(ProductsPage.inventoryItems).toBeElementsArrayOfSize(6)

            
            await browser.execute(() => localStorage.clear())
            await browser.deleteCookies()
        }
    })
})
