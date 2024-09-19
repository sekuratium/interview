// замудрённое решение (фактически полный перебор)

const stringMax = (...args) => args.reduce((m, e) => (e > m ? e : m));
const CACHE = {};

var largestNumber = function (nums) {
    if (nums.length === 1) {
        return String(nums[0]);
    }

    const array = nums.map((num, i) => {
        if (!CACHE[`${nums.join()}_${num}`]) {
            CACHE[`${nums.join()}_${num}`] = largestNumber([...nums.slice(0, i), ...nums.slice(i + 1)]);
        }

        return String(num) + CACHE[`${nums.join()}_${num}`];
    });

    return stringMax(...array);
};

console.log(largestNumber([3, 30, 34, 5, 9]));

// правильное решение

var largestNumber = function (nums) {
    if (nums.length === 0) {
        return String('0');
    }
    
    const array = nums.filter(String).sort((a, b) => (b + a).localeCompare(a + b));

    if (array[0]) {
        return '0';
    }

    return array.join('');
};
