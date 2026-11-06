import { expect, browser, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import ProductsPage from '../pageobjects/products.page.js'

describe('Sauce Demo login', () => {
    it('should login with valid credentials', async () => {

        for (const user of ['standard_user', 'problem_user', 'error_user', 'visual_user']) {
            await LoginPage.open()
            await LoginPage.login(user, 'secret_sauce')

            await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'))
            await expect($('.title')).toHaveText('Products')


            console.log('CURRENT URL:', await browser.getUrl())
            await browser.execute(() => localStorage.clear())
            await browser.deleteCookies()
        }

        await LoginPage.open()
        await LoginPage.login(LoginPage.credentials.users.standard, LoginPage.credentials.password) 
        //log back in before shopping agian 

        await ProductsPage.addToCart('Sauce Labs Onesie')
        await expect(ProductsPage.cartBadge).toHaveText('1')
    })

   
    it('should log in successfully as standard_user', async () => {
        await browser.deleteCookies() 

        await LoginPage.open()
        await LoginPage.login(LoginPage.credentials.users.standard, LoginPage.credentials.password)

        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'))
        await expect(ProductsPage.title).toHaveText('Products')
    })
