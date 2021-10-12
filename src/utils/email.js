const env = process.env.NODE_ENV || 'local'
const nodeEnvUpper = env.toUpperCase()

const url = process.env[`${nodeEnvUpper}_FRONT_URL`]

export const createPassword = (token) =>
  `<div>
  <p style="margin-bottom: 20px">Bem vindo a Smart ovitrap clique no no link abaixo para cadastrar sua senha</p>
  <a href="${url}/new-password/${token}">Cadastrar nova senha</a>
  </div>`

export const resetPassword = (token) =>
  `<div>
  <p style="margin-bottom: 20px">Recebemos sua solicitação de nova senha, clique no no link abaixo para cadastrar uma nova senha</p>
  <a href="${url}/new-password/${token}">Cadastrar nova senha</a>
  </div>`
