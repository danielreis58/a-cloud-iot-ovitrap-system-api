const { v4: uuidv4 } = require('uuid')

module.exports = Object.freeze({
  profileAdmin: uuidv4(),
  profileSupv: uuidv4(),
  profileAgent: uuidv4(),
  permissionCompany: uuidv4(),
  permissionUser: uuidv4(),
  permissionOvitrap: uuidv4(),
  companyX: uuidv4(),
  companyY: uuidv4(),
  userAdminX: uuidv4(),
  userAdminY: uuidv4(),
  userSupvX: uuidv4(),
  userSupvY: uuidv4(),
  userAgentX: uuidv4(),
  userAgentY: uuidv4(),
  ovitrap1X: uuidv4(),
  ovitrap2X: uuidv4(),
  ovitrap1Y: uuidv4()
})
