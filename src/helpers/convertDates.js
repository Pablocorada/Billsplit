export const convertDates = (date) => {

    const strDate = date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
    const parts = strDate.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return year+"-"+month.padStart(2, "0")+"-"+day.padStart(2, "0");

}