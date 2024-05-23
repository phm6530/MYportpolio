export async function requestHandler<T>(
    cb: () => Promise<{ data: T }>,
): Promise<T> {
    try {
        const { data } = await cb();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('알 수 없는 오류 ');
        }
    }
}
