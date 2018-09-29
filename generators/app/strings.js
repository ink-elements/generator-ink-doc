const capitalise = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('').toLowerCase()

const capitaliseAll = (string) => string.split(' ').map(capitalise).join(' ')

const unslugify = (slug) => capitaliseAll(slug.split('-').join(' '))

module.exports.capitalise = capitalise
module.exports.capitaliseAll = capitaliseAll
module.exports.unslugify = unslugify
