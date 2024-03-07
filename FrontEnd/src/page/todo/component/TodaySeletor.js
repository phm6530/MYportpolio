export const TodaySeletor = () => {
    const TodayCalculater = () => {
        const date = new Date();
        const Year = date.getFullYear();
        const Month = date.getMonth();
        const Day = date.getDate();
        return `${Year}-${Month + 1}-${Day}`;
    };
    return TodayCalculater;
};

export const dayFormetting = () => {
    const dayCalculater = (target) => {
        const date = new Date(target);
        const Year = String(date.getFullYear());
        const Month = String(date.getMonth() + 1);
        const Day = date.getDate();

        const monthPad = Month.padStart(2, '0');
        return `${Year}-${monthPad}-${Day}`;
    };
    return dayCalculater;
};
