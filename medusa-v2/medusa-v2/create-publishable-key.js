const crypto = require('crypto')

// Generate a publishable API key
const generatePublishableKey = () => {
  const prefix = 'pk'
  const env = process.env.NODE_ENV === 'production' ? 'live' : 'test'
  const randomBytes = crypto.randomBytes(32).toString('hex')
  return `${prefix}_${env}_${randomBytes}`
}

const publishableKey = generatePublishableKey()
console.log('🔑 Generated Publishable API Key:')
console.log(publishableKey)
console.log('')
console.log('📝 Use this key in your Vercel environment variables as:')
console.log('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=' + publishableKey)
