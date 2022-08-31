const intDate = (stringDate) => {
      const excludeBar = stringDate.substr(0, 4) +
                         stringDate.substr(5, 2) +
                         stringDate.substr(stringDate.length-2, 2);
      console.log(excludeBar);
      const intDate = parseInt(excludeBar);
      console.log(intDate);
      return intDate;
    }

const todayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = 1+today.getMonth();
      const date = today.getDate();
      return `${year}${month}${date}`;
    }

export {intDate, todayDate};