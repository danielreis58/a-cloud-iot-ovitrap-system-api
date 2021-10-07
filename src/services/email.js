import sgMail from '@sendgrid/mail'

const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env

const sendEmail = (to, subject, html) => {
  const from = SENDGRID_SENDER || 'teste@smartovitraps.com.br'

  const message = { to, from, subject, html }

  sgMail.setApiKey(SENDGRID_API_KEY)
  sgMail
    .send(message)
    .then(() => console.log('Email was successfully sent'))
    .catch((error) => console.log('Email send error', error))
}

export default sendEmail
