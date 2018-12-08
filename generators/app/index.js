const strings = require('./strings')
const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts)
    this.argument('name', { type: String, required: true })
    this.option('author', { type: String })
    this.option('email', { type: String })
  }

  prompting() {
    this.log(`\nGenerating new ${chalk.green('ink-elements')} project in folder ${chalk.green(this.options.name)}!`)
  }

  writing() {
    this.destinationRoot(this.destinationPath(this.options.name))

    const document = {
      name: this.options.name,
      title: strings.unslugify(this.options.name),
      author: {
        name: this.options.author || this.user.git.name(),
        email: this.options.email || this.user.git.email()
      },
      copyright: {
        year: (new Date()).getFullYear()
      }
    }

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      document
    )

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      document
    )

    this.fs.copy(
      this.templatePath('main.css'),
      this.destinationPath('main.css')
    )

    this.fs.copy(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js')
    )

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      document
    )

    this.fs.copy(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    )

    this.fs.copy(
      this.templatePath('.htmllintrc'),
      this.destinationPath('.htmllintrc')
    )

    this.fs.copy(
      this.templatePath('.stylelintrc'),
      this.destinationPath('.stylelintrc')
    )

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )
  }

  install() {
    this.installDependencies({ bower: false })
  }

}
