import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
   
    credentials = {
        users: {
            standard: 'standard_user',
            lockedOut: 'locked_out_user',
            problem: 'problem_user',
            performanceGlitch: 'performance_glitch_user',
            error: 'error_user',
            visual: 'visual_user'
        },
        password: 'secret_sauce'
        }
    /**
     * define selectors using getter methods
     */

    get btnSubmit () {
        return $('#login-button');
    }
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get errorMessage () {
        return $('[data-test="error"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
}

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

export default new LoginPage();

