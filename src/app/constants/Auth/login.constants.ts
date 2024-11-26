export const loginConstants = {
"ERRORMESSAGE":{
    "USERNAMEERROR":{
        "REQUIRED":"UserName is required."
    },
    "PASSWORDERROR":{
        "REQUIRED":"Password is required.",
        "PATTERN":"Must include 8+ chars, uppercase, lowercase, number, & symbol."
    }
},
"REGULAREXPRESSION":{
    "PASSWORD":"^(?=.*[0-9])"
                       +"(?=.*[a-z])(?=.*[A-Z])"
                       + "(?=.*[@#$%^&+=])"
                       + "(?=\\S+$).{8,20}$"
}

}