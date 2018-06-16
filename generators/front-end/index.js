var Generator = require('yeoman-generator');
var dashify = require('dashify');


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.defaultAppname = "MyTokenIco";
    this.destinationName = dashify(this.defaultAppname);
  }

  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'Front-end app name',
        default : this.defaultAppname // Default to current folder name
      },
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
      this.templatePath('./!(node_modules)'), 
      this.destinationPath(this.destinationName)
    );

    this.fs.copyTpl(
      this.templatePath('gatsby-config.js.ejs'),
      this.destinationPath(`${this.destinationName}/gatsby-config.js`),
      { 
        siteTitle: this.props.appName 
      }
    );

    const pkgJson = {
        name: this.destinationName,
        description: "Your description here",
        version: "0.1.0",
        dependencies: {
          "gatsby": "^1.9.247",
          "gatsby-link": "^1.6.40",
          "gatsby-plugin-react-helmet": "^2.0.10",
          "react-helmet": "^5.2.0"
        },
        keywords: [
          "gatsby"
        ],
        license: "MIT",
        scripts: {
          "build": "gatsby build",
          "develop": "gatsby develop",
          "format": "prettier --write 'src/**/*.js'",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        devDependencies: {
          "prettier": "^1.12.0"
        }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath(`${this.destinationName}/package.json`), pkgJson);
  }

  install() {
    this.log(this.destinationRoot(this.destinationPath(this.destinationName)));
    this.yarnInstall();
  }
};
