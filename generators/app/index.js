var Generator = require('yeoman-generator');
var dashify = require('dashify');


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.defaultAppname = "MyTokenIco";
    this.defaultTokenName = "Token Name";
    this.defaultTokenSymbol = "SYM";
    this.defaultTokenSupply = 1000000;

    this.destinationName = dashify(this.defaultAppname);
    this.tokenName;
  }

  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'Your project name',
        default : this.defaultAppname // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'tokenName',
        message : 'Provide token name',
        default : this.defaultTokenName
      },
      {
        type    : 'input',
        name    : 'tokenSymbol',
        message : 'Provide token symbol',
        default : this.defaultTokenSymbol
      }, 
      {
        type    : 'input',
        name    : 'tokenSupply',
        message : 'Provide total token supply. Input will be multiplied by 10^18!',
        default : this.defaultTokenSupply
      },
      {
        type    : 'confirm',
        name    : 'frontEnd',
        message : 'Do you want to generate a React front-end app?'
      }
    ]).then((answers) => {
      this.props = answers;
    });
  }

  configuring() {
    this.destinationName = dashify(this.props.appName);
    this.log('Destination folder', this.destinationName);
    this.tokenName = this.props.tokenName;
  }

  writing() {
    this.fs.copy(
      this.templatePath('*/*[!*.ejs]'), 
      this.destinationPath(`${this.destinationName}/`)
    );
    this.fs.copyTpl(
      this.templatePath('contracts/MintableToken.sol.ejs'),
      this.destinationPath(`${this.destinationName}/contracts/${this.tokenName}.sol`),
      { 
        tokenName: this.tokenName 
      }
    );

    const pkgJson = {
      devDependencies: {
        
      },
      dependencies: {
        
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath(`${this.destinationName}/package.json`), pkgJson);
  }

  install() {
    // Change directory
    this.log(this.destinationRoot(this.destinationPath(this.destinationName)));
    this.yarnInstall();

    // Install front-end app, if user selected that option
    if (this.props.frontEnd) {
      this.composeWith(require.resolve('../front-end'));
    }
  }
};
