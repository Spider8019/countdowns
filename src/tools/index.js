function convertSecondsToDayFormat(seconds){
    const dayFormat= `${("0" + Math.floor(seconds / (3600 * 24)).toString()).slice(-2)}:${("0" + Math.floor(seconds % (3600 * 24) / 3600)).toString().slice(-2)}:${("0" + Math.floor(seconds % 3600 / 60).toString()).slice(-2)}:${("0" + Math.floor(seconds % 60).toString()).slice(-2)}`
    return dayFormat
}
function isTokenExpired(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    const expirationTime = payload.exp * 1000 // Convert expiration time to milliseconds
    const currentTime = Date.now()
    return currentTime >= expirationTime
  }

export {convertSecondsToDayFormat,isTokenExpired};