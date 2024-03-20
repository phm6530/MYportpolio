const filterByDate = (arr = {}, selectDay) => {
    const formattedSelectDay = new Date(selectDay).toDateString();
    let filterArr = [];

    for (const [date, events] of Object.entries(arr)) {
        const formattedDate = new Date(date).toDateString();
        if (formattedSelectDay === formattedDate) {
            filterArr = filterArr.concat(events);
        }
    }
    return filterArr;
};

export { filterByDate };
