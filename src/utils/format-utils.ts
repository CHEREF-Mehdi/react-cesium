export function dateToString(date:Date) : string{
    return date.toLocaleDateString() +" at "+ date.toLocaleTimeString()
}