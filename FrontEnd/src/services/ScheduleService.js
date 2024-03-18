// 초기데이터 로더
const scheduleFetch = async (Year, Month) => {
    console.log('실행해라 !!!!!!!!!!!!!!!!!!!!!!!');
    try {
        const response = await fetch(
            `http://localhost:8080/schedule?Year=${Year}&month=${Month}`,
        );
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        return await response.json();
    } catch (error) {
        throw new Error('서버오류 입니다.');
    }
};

// 스케줄 추가
const fetchAddSchedule = async formData => {
    console.log('formData-- Dday ', formData);
    try {
        const response = await fetch('http://localhost:8080/schedule/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// 스케줄 수정
const fetchEditSchedule = async formData => {
    try {
        const response = await fetch('http://localhost:8080/schedule/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// 스케줄 삭제
const fetchDeleteSchedule = async formData => {
    try {
        const response = await fetch('http://localhost:8080/schedule/delete', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule_key: formData }),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
};

// Complete Toggle
const fetchToggleComplete = async formData => {
    try {
        const response = await fetch(
            'http://localhost:8080/schedule/complete',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schedule_key: formData }),
            },
        );
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
};

const fetchGit = async () => {
    try {
        const response = await fetch(
            'https://api.github.com/repos/phm6530/MYportpolio/commits',
        );
        if (!response.ok) {
            throw new Error('Git에 문제가 있는것 같습니다.');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export {
    scheduleFetch,
    fetchAddSchedule,
    fetchEditSchedule,
    fetchDeleteSchedule,
    fetchToggleComplete,
    fetchGit,
};
