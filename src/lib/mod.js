export function mod(number, divisor) {
    if (number >= 0) {
        return number % divisor;
    }

    return (number % divisor) + divisor;
}