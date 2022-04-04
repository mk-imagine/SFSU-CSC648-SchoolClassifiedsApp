const validator = {};

//checks if username is valid
validator.usernameValid = (username) => {
    return new Promise((resolve, reject) => {
        if (username && beginsWithLetter(username) && username.length > 2) {
            return resolve(true);
        } else {
            return resolve(false);
        }
    })
}

//checks if email is valid, I changed the one Mark had so that it's sfsu email.
// emailValid code used from w3resource.com
validator.emailValid = (email) => {
    return new Promise((resolve, reject) => {
        return resolve(email && email.includes("@") &&
            email.includes(".") &&
            //@mail.sfsu.edu or @sfsu.edu?
            (/^[a-zA-Z]+([^!@#$^&*-+/]*)+@mail.sfsu.edu/.test(email)) ||
            (/^[a-zA-Z]+([^!@#$^&*-+/]*)+@sfsu.edu/.test(email)))
    });
};

//checks if password is valid
validator.passwordValid = (pwd) => {
    return new Promise((resolve, reject) => {
        return resolve(pwd && containsUpperCaseLetter(pwd) && containsNumber(pwd) && containsSpecialChar(pwd) && validPasswordLength(pwd));
    });
};

//checks if the confirm password matchs the password
validator.cpasswordValid = (pwd, cpwd) => {
    return new Promise((resolve, reject) => {
        return resolve(pwd && cpwd && pwd == cpwd);
    });
};

//not sure what this does
validator.postNoNulls = (a, b, c, d, e, f) => {
    return new Promise((resolve, reject) => {
        noNulls = Boolean(a) && Boolean(b) && Boolean(c) && Boolean(d) && Boolean(e) && Boolean(f);
        return resolve(noNulls);
    })
};

//not sure what this does
validator.notNull = (input) => {
    return new Promise((resolve, reject) => {
        return resolve(input);
    });
};

//used by usernameValid
function beginsWithLetter(str) {
    return str.charAt(0).match(/[a-zA-Z]/) != null;
}

//used by passwordValid
function validPasswordLength(pwd) {
    return pwd.length > 7;
}

//used by passwordValid
function containsUpperCaseLetter(pwd) {
    return pwd.search(/[A-Z]/) != -1;
}

//used by passwordValid
function containsNumber(pwd) {
    return pwd.search(/[0-9]/) != -1;
}

//used by passwordValid
function containsSpecialChar(pwd) {
    return pwd.search(/[/*\-+!@#$^&]/) != -1;
}

module.exports = validator;
