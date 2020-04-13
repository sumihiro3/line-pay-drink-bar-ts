import { Router, Request, Response } from 'express'

const router = Router()

// Mock Users
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }]

/* GET users listing. */
router.get('/users', (req: Request, res: Response) => {
  console.log(req.url)
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', (req: Request, res: Response) => {
  console.log(req.url)
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
