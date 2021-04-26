export const responseClient = (res, data, status = 200) => {
  res.status(status)
  res.json({
    status,
    body: data
  })
}

export const errorResponse = (res, error) => {
  let code = 500

  // FOR DEBUGGING
  console.log(
    'ERROR ========================>',
    error,
    '<======================== ERROR'
  )

  if (Number.isInteger(error?.code)) {
    code = error.code
  }

  const message =
    code !== 500
      ? error?.message || 'Internal server error'
      : 'Internal server error'

  const data = {
    error: true,
    message
  }

  responseClient(res, data, code)
}
