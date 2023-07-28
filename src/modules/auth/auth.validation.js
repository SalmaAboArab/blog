import joi from 'joi'


export const signupSchema=joi.object({
    username:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cpassword:joi.string().valid(joi.ref('password')).required(),
    age:joi.number().required()
})