const { generateEntityId } = require('@medusajs/framework/utils')

async function seedPublishableKey() {
  try {
    const container = require('@medusajs/framework').getContainer()
    const apiKeyService = container.resolve('apiKeyModuleService')
    
    console.log('🔑 Creating publishable API key...')
    
    const publishableKey = await apiKeyService.createApiKeys({
      title: 'Storefront Key',
      type: 'publishable',
      created_by: 'system',
    })
    
    console.log('✅ Publishable API key created:', publishableKey.token)
    console.log('📝 Save this key for your storefront environment variables!')
    
    return publishableKey.token
  } catch (error) {
    console.error('❌ Error creating publishable key:', error)
    throw error
  }
}

module.exports = { seedPublishableKey }
