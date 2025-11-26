export function hasNumber(string: string): boolean {
    return /\d/.test(string);
}
export function hasSpecialCharacter(str: string): boolean {
    return /[^a-zA-Z0-9]/.test(str);
}
export function hasCapitalLetter(str: string): boolean {
    return /[A-Z]/.test(str);
}