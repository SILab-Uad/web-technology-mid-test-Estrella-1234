const generatePassword = (length, options) => {
    // Character sets for password generation
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";

    // Initialize the character set based on options
    let charSet = "";
    let guaranteedChars = [];

    // Collect at least one guaranteed character for each selected type
    if (options.includeUppercase) {
        charSet += uppercase;
        guaranteedChars.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    if (options.includeLowercase) {
        charSet += lowercase;
        guaranteedChars.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
    if (options.includeNumbers) {
        charSet += numbers;
        guaranteedChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (options.includeSpecialChars) {
        charSet += specialChars;
        guaranteedChars.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
    }

    // Throw an error if no character type is selected
    if (charSet === "") {
        throw new Error("At least one character type must be selected.");
    }

    // Generate the password for the remaining length (excluding guaranteed characters)
    let password = "";
    for (let i = 0; i < length - guaranteedChars.length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    // Append guaranteed characters to ensure at least one of each selected type
    password += guaranteedChars.join('');

    // Shuffle the password to randomize the placement of guaranteed characters
    return password.split('').sort(() => Math.random() - 0.5).join('');
};

module.exports = {
    generatePassword
};
