function convertSecondsToDayFormat(seconds){
    const dayFormat= `${("0" + Math.floor(seconds / (3600 * 24)).toString()).slice(-2)}:${("0" + Math.floor(seconds % (3600 * 24) / 3600)).toString().slice(-2)}:${("0" + Math.floor(seconds % 3600 / 60).toString()).slice(-2)}:${("0" + Math.floor(seconds % 60).toString()).slice(-2)}`
    return dayFormat
}

export {convertSecondsToDayFormat};