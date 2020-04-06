'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const shell = require('shelljs')

const inkDoc = path.join(__dirname, '../generators/app')

describe('generator-ink-doc:app', () => {

  it('creates project folder', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('../test-project'))
  })

  it('creates Node project', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('package.json'))
  })

  it('set package name', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.jsonFileContent('package.json', { name: 'test-project' }))
  })

  it('set package author name', () => {
    return helpers.run(inkDoc)
      .withArguments([
        'test-project',
        '--author=Example Name',
        '--email=email@example.com'
      ])
      .then(() => assert.jsonFileContent('package.json', { author: { name: 'Example Name' } }))
  })

  it('set package author email', () => {
    return helpers.run(inkDoc)
      .withArguments([
        'test-project',
        '--author=Example Name',
        '--email=email@example.com'
      ])
      .then(() => assert.jsonFileContent('package.json', { author: { email: 'email@example.com' } }))
  })

  it('set package author name from git config if not provided as command-line option', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .inTmpDir(() => {
        shell.exec('git init --quiet')
        shell.exec('git config --local user.name Gitter')
      })
      .then(() => assert.jsonFileContent('package.json', { author: { name: 'Gitter' } }))
  })

  it('set package author email from git config if not provided as command-line option', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .inTmpDir(() => {
        shell.exec('git init --quiet')
        shell.exec('git config --local user.email git@example.org')
      })
      .then(() => assert.jsonFileContent('package.json', { author: { email: 'git@example.org' } }))
  })

  it('creates document', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('index.html'))
  })

  it('set document title', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.fileContent('index.html', '<title>Test Project</title>'))
  })

  it('set document header', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.fileContent('index.html', '<h1>Test Project</h1>'))
  })

  it('set document attribution', () => {
    return helpers.run(inkDoc)
      .withArguments([
        'test-project',
        '--author=Example Name',
        '--email=email@example.com'
      ])
      .then(() => assert.fileContent('index.html', '<p>By Example Name</p>'))
  })

  it('set copyright notice', () => {
    const year = (new Date()).getFullYear()
    return helpers.run(inkDoc)
      .withArguments([
        'test-project',
        '--author=Example Name',
        '--email=email@example.com'
      ])
      .then(() => assert.fileContent('index.html', `<p>This work is copyright Example Name ${year}.</p>`))
  })

  it('creates style sheet', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('main.css'))
  })

  it('creates build file', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('Gruntfile.js'))
  })

  it('creates documentation', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('README.md'))
  })

  it('sets documentation title', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.fileContent('README.md', '# Test Project Document'))
  })

  it('sets documentation description', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.fileContent('README.md', 'Test Project HTML document.'))
  })

  it('creates JavaScript linting configuration', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('.eslintrc.json'))
  })

  it('creates HTML linting configuration', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('.htmllintrc'))
  })

  it('creates style linting configuration', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('.stylelintrc'))
  })

  it('creates source control exclusion file', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('.gitignore'))
  })

  it('creates web bundler config', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('rollup.config.js'))
  })

  it('creates web component script', () => {
    return helpers.run(inkDoc)
      .withArguments(['test-project'])
      .then(() => assert.file('.gitignore'))
  })

})
