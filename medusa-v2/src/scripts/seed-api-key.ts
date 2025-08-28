import { MedusaApp, Modules } from "@medusajs/framework/utils"

const seedPublishableKey = async () => {
  const { shutdown, container } = await MedusaApp({
    loadModules: {
      [Modules.API_KEY]: "@medusajs/medusa/api-key"
    }
  })

  try {
    console.log("🔑 Creating publishable API key...")
    
    const apiKeyModuleService = container.resolve("apiKeyModuleService")
    
    // Check if a publishable key already exists
    const existingKeys = await apiKeyModuleService.listApiKeys({
      type: "publishable"
    })
    
    if (existingKeys.length > 0) {
      console.log("✅ Publishable key already exists:", existingKeys[0].token)
      console.log("📝 Use this key: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=" + existingKeys[0].token)
      await shutdown()
      return existingKeys[0].token
    }

    // Create a new publishable key
    const publishableKey = await apiKeyModuleService.createApiKeys({
      title: "Storefront Key",
      type: "publishable",
      created_by: "system"
    })
    
    console.log("✅ New publishable API key created:", publishableKey.token)
    console.log("📝 Use this key: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=" + publishableKey.token)
    
    await shutdown()
    return publishableKey.token
  } catch (error) {
    console.error("❌ Error creating publishable key:", error)
    await shutdown()
    throw error
  }
}

seedPublishableKey().catch(console.error)
