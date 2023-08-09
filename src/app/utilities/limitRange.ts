export const limitRange = (n, min, max) => {
    let c = n;

    if (c > max) {
        c = max;
    }

    if (c < min) {
        c = min;
    }

    return c;
};
