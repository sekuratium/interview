// подсчёт количества разбиений строки на ip адреса
function count(str, numberOfDots) {
    if (numberOfDots === 0) {
        return str.length > 0 && str.length < 4 && Number(str) <= 255 && (str === '0' || str[0] !== '0') ? 1 : 0;
    }

    if (str[0] === '0') {
        return count(str.substring(1), numberOfDots - 1);
    }

    return (
        count(str.substring(1), numberOfDots - 1) +
        count(str.substring(2), numberOfDots - 1) +
        (Number(str.substring(0, 3)) <= 255 ? count(str.substring(3), numberOfDots - 1) : 0)
    );
}

// разбиение строки на ip и выдача всех таких разбиений
function structurePartition(str, numberOfDots) {
    if (numberOfDots === 0) {
        return str.length > 0 && str.length < 4 && Number(str) <= 255 && (str === '0' || str[0] !== '0') ? [str] : [];
    }

    if (str[0] === '0') {
        return structurePartition(str.substring(1), numberOfDots - 1).map((arr) => [
            '0',
            ...(Array.isArray(arr) ? arr : [arr]),
        ]);
    }

    return [
        ...structurePartition(str.substring(1), numberOfDots - 1).map((arr) => [
            str.substring(0, 1),
            ...(Array.isArray(arr) ? arr : [arr]),
        ]),
        ...structurePartition(str.substring(2), numberOfDots - 1).map((arr) => [
            str.substring(0, 2),
            ...(Array.isArray(arr) ? arr : [arr]),
        ]),
        ...(Number(str.substring(0, 3)) <= 255
            ? structurePartition(str.substring(3), numberOfDots - 1).map((arr) => [
                str.substring(0, 3),
                ...(Array.isArray(arr) ? arr : [arr]),
            ])
            : []),
    ];
}

// console.log(structurePartition('25525511135', 3));
// console.log(structurePartition('11135', 1));
// console.log(structurePartition('101023', 3));
