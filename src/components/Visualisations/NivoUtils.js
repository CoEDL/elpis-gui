/**
 * Given a range, the calculateTickValues function returns appropriately
 * space integer values that can be used for the axes of a graph.
 * 
 * The function automatically applies a 15% margin to the min and max
 * values supplied.
 * 
 * @param {*} min 
 * @param {*} max 
 */
export const calculateTickValues = (min, max, ticks) => {
    const range = max - min;
    const tickMin = Math.floor(min - (range * 0.2));
    const tickMax = Math.ceil(max + (range * 0.2));
    const realRange = tickMax - tickMin;
    console.log(realRange)
    const step = Math.ceil(realRange / ticks);
    console.log(step)
    var result = [];
    var i = tickMin;
    result.push(i);
    do {
        i += step;
        result.push(i);
    }
    while (i < tickMax);
    console.log(result)
    return result;
}

