module.exports.registerInputValidate=(email,username,password,confirmPassword)=>{
    const errors={};
    if(username.trim()==="") {
        errors.username="Username must not be empty!"
    }
    if(email.trim()==="") {
        errors.email="Email must not be empty!"
    }else{
        const regex=/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(regex)) {
            errors.email="Email must be a valid e-mail address"
        }
    }

    if(password.trim()==="") {
        errors.password="Password must not be empty!";
    }else{
        if(password!==confirmPassword) {
            errors.confirmPassword="Passwords do not match";
        }
    }


    return {
        errors,
        valid:Object.keys(errors).length<1
    }

}


module.exports.loginInputValidate=(username,password)=>{
    const errors={};
    if(username.trim()==="") {
        errors.username="Username must not be empty!"
    }

    if(password.trim()==="") {
        errors.password="password must not be empty!"
    }

    return {
        errors,
        valid:Object.keys(errors).length<1
    }

}


module.exports.commentInputValidate=(comment)=>{
    const errors={};

    if(comment.trim()==="") {
        errors.comment="Comment must not be empty!"
    }

    return {
        errors,
        valid:Object.keys(errors).length<1
    }
}

