/**
 * Registration form validation
 * @param {*} values 
 * @returns errors, if any
 */
export default function validate(values) {
    let errors = {};

    if (!values.firstname.trim()) {
        errors.firstname = "First name required";
    }

    if (!values.lastname.trim()) {
        errors.lastname = "First name required";
    }

    if (!values.email) {
        errors.email = 'SFSU email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    } else if (!values.email.endsWith('mail.sfsu.edu')){
        errors.email = 'Your Email address is not a SFSU email';
    }

    if(!values.password){
        errors.password = 'Password required';
    }

    if(values.password2 !== values.password){
        errors.password2 = 'Passwords does not match'
    } else if (!values.password2){
        errors.password2 = 'Password required'
    }

    return errors; 
}