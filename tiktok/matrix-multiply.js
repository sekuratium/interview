function multiply(A, B) {
    const C = Array.from(Array(A.length), () => new Array(B[0].length));

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            C[i][j] = A[i].reduce((sum, Ai, index) => sum + Ai * B[index][j], 0);
        }
    }

    return C;
}
