function retry(fn, times, delay) {
    return new Promise((resolve, reject) => {
        fn().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                if (times === 1) {
                    reject(error);
                } else {
                    setTimeout(() => resolve(retry(fn, times - 1, delay)), delay);
                }
            },
        );
    });
}
