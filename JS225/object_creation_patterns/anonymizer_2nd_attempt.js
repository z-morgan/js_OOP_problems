// OLOO strategy
// const Account = {
//   init(email, password, firstName, lastName) {
//     function selectRandomItem(list) {
//       let range = list.length;
//       let index = Math.floor(Math.random() * range);
//       return list[index];
//     }
    
//     function generateDisplayName() {
//       const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
//       let displayName = '';
    
//       for (let n = 1; n <= 16; n += 1) {
//         displayName += selectRandomItem(CHARS);
//       }
    
//       return displayName;
//     }

//     function isInvalidPassword(oldPassword, newPassword) {
//       return oldPassword !== newPassword;
//     }

//     this.displayName = generateDisplayName();

//     this.reanonymize = function (p) {
//       if (isInvalidPassword(password, p)) {
//         return 'Invalid Password';
//       } else {
//         this.displayName = generateDisplayName();
//         return true;
//       }
//     };

//     this.firstName = (p) => {
//       return isInvalidPassword(password, p) ? 'Invalid Password' : firstName;
//     };

//     this.email = (p) => {
//       return isInvalidPassword(password, p) ? 'Invalid Password' : email;
//     };

//     this.resetPassword = (p, newPass) => {
//       if (isInvalidPassword(password, p)) {
//         return 'Invalid Password';
//       } else {
//         password = newPass;
//         return true;
//       }
//     };

//     return this;
//   },
// };


// Pseudo-Classical strategy (must use Class syntax)
function selectRandomItem(list) {
  let range = list.length;
  let index = Math.floor(Math.random() * range);
  return list[index];
}

function generateDisplayName() {
  const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  let displayName = '';

  for (let n = 1; n <= 16; n += 1) {
    displayName += selectRandomItem(CHARS);
  }

  return displayName;
}



class Account {
  #email
  #password
  #firstName
  #lastName

  constructor(email, password, firstName, lastName) {
    this.#email = email;
    this.#password = password;
    this.#firstName = firstName;
    this.#lastName = lastName;

    this.displayName = this.#generateDisplayName();
  }

  #selectRandomItem(list) {
    let range = list.length;
    let index = Math.floor(Math.random() * range);
    return list[index];
  }
  
  #generateDisplayName() {
    const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    let displayName = '';
  
    for (let n = 1; n <= 16; n += 1) {
      displayName += this.#selectRandomItem(CHARS);
    }
  
    return displayName;
  }

  #isInvalidPassword(oldPassword, newPassword) {
    return oldPassword !== newPassword;
  }

  reanonymize(p) {
    if (this.#isInvalidPassword(this.#password, p)) {
      return 'Invalid Password';
    } else {
      this.displayName = this.#generateDisplayName();
      return true;
    }
  }

  resetPassword(p, newPass) {
    if (this.#isInvalidPassword(this.#password, p)) {
      return 'Invalid Password';
    } else {
      this.#password = newPass;
      return true;
    }
  }

  firstName(p) {
    return this.#isInvalidPassword(this.#password, p) ? 'Invalid Password' : this.#firstName;
  }

  email(p) {
    return this.#isInvalidPassword(this.#password, p) ? 'Invalid Password' : this.#email;
  }
}



let fooBar = new Account('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));            // logs true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = new Account('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));      