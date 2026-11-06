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

    it('should log in as standard_user and display the Products page', async () => {
      
        await LoginPage.inputUsername.setValue(LoginPage.credentials.users.standard)
        await LoginPage.inputPassword.setValue(LoginPage.credentials.password)

      
        await LoginPage.btnSubmit.click()

     
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'))
        await expect(ProductsPage.title).toHaveText('Products')
        await expect(ProductsPage.inventoryItems).toBeElementsArrayOfSize({ gte: 1 })
    })
})
