//UNIT TEST
let passText = 'background: #222; color: #61B97F';
let failText = 'background: #222; color: #E42A1B';


// unit test for email_check:

//unit test for email_check:


//unit test for email_check:

function testEmailCheck(description, expectation, func) {
    if(func == expectation) {
      console.log(`%cPass: ${description}`, passText)
    } else {
      console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText)
    }
}
testEmailCheck("Email must only contain characters a->z,A->Z,0->9", true, emailCheck("aaa@aaa.aaa"));
testEmailCheck("Email must only contain characters a->z,A->Z,0->9", true, emailCheck("dylan00433@gmail.com"));
testEmailCheck("Email must only contain characters a->z,A->Z,0->9", true, emailCheck("aaaaaaa"));


//unit test for password_check:
function testPasswordCheck(expect, funcCheck) {
    var descript = "Password can only contains characters a->z,A->Z,0->9 and symbol !#$%&'*+-/=?^_`{|}";
    if(funcCheck == expect) {
        console.log(`%cPass: ${descript}`, passText)
      } else {
        console.log(`%cFail: actual: ${funcCheck}, expect: ${expect}`, failText)
      }
}
testPasswordCheck(true, passwordCheck("akkajskajaaaa"));
testPasswordCheck(true, passwordCheck("akkaj   skajaaaa"));
testPasswordCheck(true, passwordCheck("akkajsk###!!!!!!!ajaaaa"))