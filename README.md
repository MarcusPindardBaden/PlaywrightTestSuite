Playwright test suite.

Currently hooked up to Github actions to run each PR

Testscan be found in the test folder whilst the locators and methods are split across the pages. I've kept locators and methods together as the test suite is relatively small however as the number of tests expands there is scope for splitting these out further. Next steps ideally would be to integrate gmail for the registration email confirmations, and adding accessibility scans. Also transitioning all passwords to be secrets to add security is pivotal

To run the test suite:
1. pull the repo down
2. run npm install
3. run $env:ENV = "staging"
4. run npx playwright test employees
