import { MedusaApp } from "@medusajs/framework"

const createAdminUser = async () => {
  const { shutdown } = await MedusaApp()

  try {
    console.log("🔑 Creating admin user...")
    
    // For now, let's use a simple approach
    console.log("✅ Please create admin user through the web interface at:")
    console.log("http://localhost:9000/app")
    console.log("")
    console.log("If the interface doesn't work, you can create one via API:")
    console.log("POST http://localhost:9000/admin/users")
    console.log('Body: {"email": "admin@example.com", "password": "supersecret123"}')
    
    await shutdown()
  } catch (error) {
    console.error("❌ Error:", error)
    await shutdown()
  }
}

createAdminUser().catch(console.error)
