function curry(fn) {
    const helper = ({ func, args, prevArgs }) => {
        if (args.length + prevArgs.length >= func.length) {
            return func(...prevArgs, ...args);
        }

        return (...newArgs) =>
            helper({
                args: newArgs,
                prevArgs: [...prevArgs, ...args],
                func,
            });
    };

    return (...args) =>
        helper({
            func: fn,
            args,
            prevArgs: [],
        });
}

const curriedLog = curry((a, b) => {
    console.log(a, b);
});
curriedLog(1)(2);
