const Validate = (inputs) => {
    let error = []
    try {
        if (inputs && inputs.length) {
            inputs.forEach((input) => {
                if (input.hasOwnProperty('required') && input.required === true && input.input === '') {
                    const name = capitalized(input.field)
                    const message = {
                        field: input.field,
                        error: `*${name} field is required`
                    }
                    error.push(message)
                } else if (input.hasOwnProperty('maxLength') && input.input !== '' && input.input.length > input.maxLength) {
                    const message = {
                        field: input.field,
                        error: `*Must be a maximum of ${input.maxLength} characters`
                    }
                    error.push(message)
                } else if (input.hasOwnProperty('minLength') && input.input !== '' && input.input.length < input.minLength) {
                    const message = {
                        field: input.field,
                        error: `*Must be a minimum of ${input.minLength} characters`
                    }
                    error.push(message)
                } else if (input.hasOwnProperty('email') && input.email === true) {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    if (!emailRegex.test(input.input)) {
                        const message = {
                            field: input.field,
                            error: '*Invalid email format'
                        }
                        error.push(message)
                    }
                } else if (input.hasOwnProperty('phone') && input.phone === true && input.input !== '') {
                    const phoneRegex = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g
                    if (!phoneRegex.test(input.input)) {
                        const message = {
                            field: input.field,
                            error: `*Phone number is invalid`
                        }
                        error.push(message)
                    }
                } else if (input.hasOwnProperty('equals')) {
                    const compareField = inputs.find(item => item.field === input.equals)
                    if (compareField && input.input !== compareField.input) {
                        const name = capitalized(input.field)
                        const equalsName = capitalized(compareField.field)
                        const message = {
                            field: input.field,
                            error: `*${name} must equal ${equalsName}`
                        }
                        error.push(message)
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
            })
        }
    } catch (e) {
        console.error('Error during validation:', e)
    }

    return error.length ? error : 'success'
}

const capitalized = (string) => {
    if (string) {
        let firstLetter = string.charAt(0).toUpperCase()
        const newName = string.replace(/-/g, ' ')
        return firstLetter + newName.slice(1)
    }
    return string
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





export {
    Validate, 
    capitalized,
    WordsCount,
}














// Example usage for testing purposes
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

// const validation = Validate(input)
// console.log('Validation result:', validation)
// validation.forEach((validate) => {
//     if (validate.field === 'email') {
//         console.log(validate.error)
//     }
//     if (validate.field === 'password') {
//         console.log(validate.error)
//     }
// })
