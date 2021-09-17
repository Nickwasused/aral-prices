export function isafternow(time) {
    let now = new Date();
    let timetocheck = new Date(time);
    if (now > timetocheck) {
        return true
    } else {
        return false
    }
}

const exports = {
    isafternow
}

export default exports