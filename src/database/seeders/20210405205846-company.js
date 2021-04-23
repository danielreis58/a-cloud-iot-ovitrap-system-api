module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'companies',
      [
        {
          name: 'Empresa X',
          email: 'email@empresax.com',
          document: '69.989.407/0001-90',
          site: 'www.empresax.com',
          cep: '69905-211',
          address: 'Travessa Maria Tereza',
          number: 15,
          neighborhood: 'Cadeia Velha',
          city: 'Rio Branco',
          state: 'AC',
          telephone: '(11) 2937-7315',
          note: 'dinossauro',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Empresa Y',
          email: 'email@empresay.com',
          document: '51.199.983/0001-78',
          site: 'www.empresay.com',
          cep: '04207-000',
          address: 'Rua Lino Coutinho',
          number: 887,
          neighborhood: 'Ipiranga',
          city: 'São Paulo',
          state: 'SP',
          telephone: '(11) 99779-6785',
          note: '',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('companies', null, {})
  }
}
