import * as yup from 'yup'
import Student from '../models/Student'

class StudentController {
    async store(req, res) {
        const schema = yup.object().shape({
            name: yup
                .string()
                .required(),
            email: yup
                .string()
                .email()
                .required(),
            age: yup
                .number()
                .positive()
                .required(),
            height: yup
                .number()
                .positive()
                .required(),
            weight: yup
                .number()
                .positive()
                .required(),
            
        })
        const validation = schema.isValid(req.body)
        if(!validation) return res.status(400).json({ error: 'Validation fails' })
         
        const { email } = req.body
        
         
        const studentExists = await Student.findOne({ where: { email }  })
        if(studentExists) return res.status(400).json({ error: 'Student already exists' })
         

        const student = await Student.create(req.body)
            .then(res.json(req.body))
             
    }
}

export default new StudentController()