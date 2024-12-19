class PasswordGenerator {
  #upperAlphabet = []
  #lowerAlphabet = []
  #numbers = []
  #symbols = []

  constructor () {
    const aCodeAt = 'a'.charCodeAt(0)
    for (let i = 0; i < 26; i++) {
      const alphabet = String.fromCharCode(aCodeAt + i)
      this.#lowerAlphabet.push(alphabet)
      this.#upperAlphabet.push(alphabet.toUpperCase())
    }

    for (let i = 0; i < 10; i++) {
      this.#numbers.push(i.toString())
    }

    '!@#$%^&*()-+='.split('').forEach(symbol => this.#symbols.push(symbol))
  }

  passwordGenerator (data) {
    let chars = []

    if (data.pwInLow) chars.push(...this.#lowerAlphabet)
    if (data.pwInUpper) chars.push(...this.#upperAlphabet)
    if (data.pwInNum) chars.push(...this.#numbers)
    if (data.pwInSym) chars.push(...this.#symbols)
    if (data.pwExcludeChar) {
      const newPwExcludeChar = [...new Set(data.pwExcludeChar.split(''))] // 移除重複字元
      chars = chars.filter(char => !newPwExcludeChar.includes(char))
      if (chars.length === 0) {
        return '' // 如果全部字元除外
      }
    }
    let password = ''
    for (let i = 0; i < Number(data.pwLength); i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
  }
}

module.exports = PasswordGenerator
