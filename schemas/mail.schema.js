const tags = ['Mail'];

const bodyJsonSchema = {
    type: 'object',
    properties: {
      from: { type: 'string', default: 'Ezyet.io 🚀 <no-reply@eyzet.io>'},
      to: { type: 'string'},
      subject: { type: 'string'},
      message: { type: 'string'},
    },
    required: [ 'from', 'to', 'subject', 'message']
}
const create = {
    tags: tags,

    body: bodyJsonSchema,

    // headers: headersJsonSchema
}

module.exports = {
    create
}