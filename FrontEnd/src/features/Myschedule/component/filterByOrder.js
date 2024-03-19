const filterByDate = (arr, selectDay) => {
    let filterArr = [];
    for (const date in arr) {
        const formattedSelectDay = new Date(selectDay).toDateString();
        const formattedDate = new Date(date).toDateString();
        if (formattedSelectDay === formattedDate) {
            filterArr.push(...arr[date]);
        }
    }

    return filterArr;
};

export { filterByDate };
