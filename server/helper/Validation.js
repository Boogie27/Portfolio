


const Validate = (inputs) => {
    let error = []
    if(inputs && inputs.length) {
        inputs.map((input) => {
            if(input.hasOwnProperty('required') && input.required == true && input.input == ''){
                const name = capitalized(input.field)
                const message = {
                    field: input.field,
                    error: `*${name} field is required`
                }
                error.push(message)
            }else if(input.hasOwnProperty('maxLength') && input.input != '' && input.input.length > input.maxLength ){
                const message = {
                    field: input.field,
                    error: `*Must be maximum of ${input.maxLength} characters`
                }
                error.push(message)
            }else if(input.hasOwnProperty('minLength') && input.input != '' && input.input.length < input.minLength ){
                const message = {
                    field: input.field,
                    error: `*Must be minimum of ${input.minLength} characters`
                }
                error.push(message)
            }else if(input.hasOwnProperty('email') && input.email == true){
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regular expression for validating email
                if(!emailRegex.test(input.input)){
                    const message = {
                        field: input.field,
                        error: `*Invlaid email format`
                    }
                    error.push(message)
                }
            }else if(input.hasOwnProperty('phone') && input.phone == true && input.input != ''){
                const phoneRegex = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g // Regular expression for digits with optional + ( ) sign
                if(!phoneRegex.test(input.input)){
                    const message = {
                        field: input.field,
                        error: `*Phone number is invalid`
                    }
                    error.push(message)
                }
            }else if(input.hasOwnProperty('equals') && input.equals == true){
                for(let i = 0; i < inputs.length; i++){
                    const item = inputs[i]
                    if(input.equals == item.field && input.input != item.input){
                        const name = capitalized(input.field)
                        const equalsName = capitalized(item.field)
                        const message = {
                            field: input.field,
                            error: `*${name} must equals ${equalsName}`
                        }
                        error.push(message)
                    }
                }
            } else if(input.hasOwnProperty('wordCount') && input.input !== '') {
                const words = input.input.trim().split(/\s+/)
                const filterWords = words.filter((word) => word.length > 0)
                if(filterWords.length > input.wordCount){
                    const message = {
                        field: input.field,
                        error: `*Max word count of ${input.wordCount}`
                    }
                    error.push(message)
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





// handle word count
const WordsCount = (string='') => {
    if(string){
        const words = string.trim().split(/\s+/)
        const filterWords = words.filter((word) => word.length > 0)
        return filterWords.length
    }
    return 0
}


const capitalized = (string) => {
    if(string){
        let firstletter = string[0].toUpperCase()
        const newName = string.split('-').join(' ')
        return firstletter + newName.slice(1)
    }
}


module.exports = {
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
//     if(validate.field == 'email'){
//         console.log(validate.error)
//     }
//     if(validate.field == 'password'){
//         console.log(validate.error)
//     }
// })










