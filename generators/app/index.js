var Generator = require('yeoman-generator');
var dashify = require('dashify');


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.defaultAppname = "MyTokenIco";
    this.defaultTokenName = "MyToken";

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
        message : 'Token name',
        default : this.defaultTokenName
      }, 
      {
        type    : 'confirm',
        name    : 'frontEnd',
        message : 'Do you want to generate a React front-end app?'
      }
    ]).then((answers) => {
      this.destinationName = dashify(answers.appName);
      this.log('Destination folder', this.destinationName);
      this.tokenName = answers.tokenName;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('*/*[!*.ejs]'), 
      this.destinationPath(`${this.destinationName}/`)
    );
    this.fs.copyTpl(
      this.templatePath('contracts/MetaCoin.sol.ejs'),
      this.destinationPath(`${this.destinationName}/contracts/${this.tokenName}.sol`),
      { tokenName: this.tokenName }
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

  // install() {
  //   this.yarnInstall();
  // }
};
