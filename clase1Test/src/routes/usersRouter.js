import { Router } from "express"
import { generateRandomUser } from "../utils.js"

const router = Router()

router.get('/', (req, res) => {
  const users = []
  for(let i = 0; i < 100; i++) {
    users.push(generateRandomUser())
  }
  res.send({status: "success", data: users})
})

export default router