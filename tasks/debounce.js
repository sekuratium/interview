function debounce(fn, timeout = 3000) {
    let timeoutId = null;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), timeout);
    };
}

function print(name) {
    console.log(`Hello, I am ${name}, nice to meet you`);
}

const debouncedPrint = debounce(print, 400);
