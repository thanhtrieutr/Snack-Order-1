let passText = 'background: #222; color: #61B97F';
let failText = 'background: #222; color: #E42A1B';

//check email character
function email_check(user){
    return /^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user)
}

//unit test for email_check:
function testEmail_check(description, expectation, func) {
    if(func == expectation) {
      console.log(`%cPass: ${description}`, passText)
    } else {
      console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText)
    }
}
testEmail_check("Email must only contain characters a->z,A->Z,0->9", true, email_check("aaa@aaa.aaa"))

//check password character
function password_check(password){
    return /^[[a-zA-Z0-9!#$%&'*+-/=?^_`{|}]+$/.test(password);
}

//unit test for password_check:
function testPassword_check(expect, funcCheck) {
    var descript = "Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}";
    if(funcCheck == expect) {
        console.log(`%cPass: ${descript}`, passText)
      } else {
        console.log(`%cFail: actual: ${funcCheck}, expect: ${expect}`, failText)
      }
}
testPassword_check(true,password_check("akkajskajaaaa"))