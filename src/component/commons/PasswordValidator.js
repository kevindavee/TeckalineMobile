export const PasswordValidator = (password) => {
    const passwordValidator = require('password-validator');
    
    const schema = new passwordValidator();
    schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();        
    
    if (schema.validate(password)) {
        return true;
    }

    return false;
};
