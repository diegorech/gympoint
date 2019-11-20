 import { Router } from 'express'

 import UserController from './app/controllers/UserController'
 import SessionController from './app/controllers/SessionController'
 import StudentController from './app/controllers/StudentController'

 import auth from './app/middlewares/auth'


 const routes = new Router()

 routes.get('/', (req, res) => {
    res.json({ message: "hellow world"})
 })

 routes.post('/users', UserController.store)

 routes.post('/sessions', SessionController.store)

 routes.post('/students', auth, StudentController.store)

export default routes