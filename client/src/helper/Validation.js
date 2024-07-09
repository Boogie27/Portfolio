


const Validate = (inputs) => {
    let error = []
    if(inputs && inputs.length) {
        inputs.map((input) => {
            if(input.required && !input.input.length){
                const name = capitalized(input.field)
                const message = {
                    field: input.field,
                    error: `*${name} field is required`
                }
                error.push(message)
            }else if(input.input.length > input.maxLength ){
                const message = {
                    field: input.field,
                    error: `*Must be maximum of ${input.maxLength} characters`
                }
                error.push(message)
            }else if(input.input.length < input.minLength ){
                const message = {
                    field: input.field,
                    error: `*Must be minimum of ${input.minLength} characters`
                }
                error.push(message)
            }else if(input.field === 'email'){
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regular expression for validating email
                if(!emailRegex.test(input.input)){
                    const message = {
                        field: input.field,
                        error: `*Invlaid email format`
                    }
                    error.push(message)
                }
            }else if(input.field === 'phone'){
                const phoneRegex = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g // Regular expression for digits with optional + ( ) sign
                if(!phoneRegex.test(input.input)){
                    const message = {
                        field: input.field,
                        error: `*Phone number is invalid`
                    }
                    error.push(message)
                }
            }else if(input.equals){
                for(let i = 0; i < inputs.length; i++){
                    const item = inputs[i]
                    if(input.equals === item.field && input.input !== item.input){
                        const name = capitalized(input.field)
                        const equalsName = capitalized(item.field)
                        const message = {
                            field: input.field,
                            error: `*${name} must equals ${equalsName}`
                        }
                        error.push(message)
                    }
                }

            }
            return error
        })
    }
    if(error.length){
        return error
    }else{
        return 'success'
    }
}



const capitalized = (string) => {
    if(string){
        let firstletter = string[0].toUpperCase()
        const newName = string.split('-').join(' ')
        return firstletter + newName.slice(1)
    }
}


export {
    Validate, 
    capitalized,
}













// ******************* EXAMPLE OF HOW TO SPECIFY INPUT FIELDS ON CLIENT SIDE OR BACKEND ************
// const input = [
//     {
//         field: 'name',
//         input: 'charles anonye',
//         maxLength: 50,
//         minLength: 3,
//         required: true,
//     },
//     {
//         field: 'email',
//         input: 'anonyecharlesgmail.com',
//         email: true,
//         required: true,
//     },
//     {
//         field: 'password',
//         input: '6678thsf',
//         maxLength: 12,
//         minLength: 6,
//         required: true,
//         equals: 'compare-password'
//     },
//     {
//         field: 'compare-password',
//         input: 'lkhfioukgdfbvubf',
//         required: true,
//     },
// ]


// ********* WHEN ERROR IS BEING RETURNED ********
// const validation = Validate(input)
// validation.map((validate) => {
//     if(validate.field === 'email'){
//         console.log(validate.error)
//     }
//     if(validate.field === 'password'){
//         console.log(validate.error)
//     }
// })










