function convertDateFormat(dateString: string) {
  const dateObject = new Date(dateString);

  let day = dateObject.getUTCDate();
  let month = dateObject.getUTCMonth() + 1;
  let year = dateObject.getUTCFullYear();

  const formattedDate = `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;

  return formattedDate;
}

export default convertDateFormat;
