# NuConta Investment Calculator

An application to calculate the returns of a specific investment made in the NuConta bank account.

This application uses:
- [Parcel](https://parceljs.org/) to bundle JavaScript files;
- [Cleave.js](https://nosir.github.io/cleave.js/) to mask the amount input field;
- [Sass](https://sass-lang.com/) to pre-process CSS;
- [Babel](https://babeljs.io/) to compile the code;
- [Jest](https://jestjs.io/pt-BR/) to test the code.


## Running the application

1. Install the dependencies by running `yarn` or `npm install` on your terminal
2. Run `yarn start` or `npm run start` to start the application
3. Open [localhost:1234](localhost:1234) on your browser to navigate

## Application details

### Initial amount
The initial investment amount is defined in the `input` variable located at line 17 in the `index.js` file. By default, the initial amount is R$ 1.000,00, but this can be changed by manipulating the input in the UI or changing the `input` variable directly.

### Period
The period of the investment is defined in the `input` variable located at line 17 in the `index.js` file. By default, the period is 60 months, but this can be changed by manipulating the slider in the UI or changing the `input` variable directly.

### Interest rate

The interest rate is defined in the `input` variable located at line 17 in the `index.js` file. By default, the monthly interest rate is 0,5%. This percentage cannot be changed in the UI, but can be changed directly in the `input` variable.

### Gross returns
The gross returns are calculated based on the amount invested, the monthly interest rate and the period of the investment before taxes are applied to the amount returned.

### Taxes
There are fixed taxes applied to the amount returned based on the period the money remains invested. Those taxes are:
- 22,5% of returns for investments younger than 6 months;
- 20% of returns for investments younger than 12 months;
- 17,5%  of returns for investments younger than 18 months;
- 15% of returns for investments older than 18 months.

Those values can be changed by manipulating the `tax` variable in the `calculator.js` file.

### Total returns
The total returns are calculated based on the gross returns with taxes applied.

## Commands
- `yarn start` or `npm run start`: starts the application on the browser;
- `yarn test` or `npm run test`: tests the application and reveals the test coverage for every JavaScript file;
- `yarn build` or `npm run build`: builds Sass files.