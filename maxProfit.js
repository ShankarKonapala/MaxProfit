function calculateOptimalProperties(n) {
    const THEATRE_TIME = 5;
    const PUB_TIME = 4;
    const COMMERCIAL_PARK_TIME = 10;

    const THEATRE_EARNING = 1500;
    const PUB_EARNING = 1000;
    const COMMERCIAL_PARK_EARNING = 3000;

    const solArr = Array(n + 1).fill(-Infinity);
    solArr[0] = 0;

    const properties = Array(n + 1).fill(null);

    for (let t = 0; t <= n; t++) {
        if (solArr[t] !== -Infinity) {
            if (t + THEATRE_TIME <= n && solArr[t] + THEATRE_EARNING > solArr[t + THEATRE_TIME]) {
                solArr[t + THEATRE_TIME] = solArr[t] + THEATRE_EARNING;
                properties[t + THEATRE_TIME] = { t: 1, p: 0, c: 0 }; 
            }
            if (t + PUB_TIME <= n && solArr[t] + PUB_EARNING > solArr[t + PUB_TIME]) {
                solArr[t + PUB_TIME] = solArr[t] + PUB_EARNING;
                properties[t + PUB_TIME] = { t: 0, p: 1, c: 0 };
            }
            if (t + COMMERCIAL_PARK_TIME <= n && solArr[t] + COMMERCIAL_PARK_EARNING > solArr[t + COMMERCIAL_PARK_TIME]) {
                solArr[t + COMMERCIAL_PARK_TIME] = solArr[t] + COMMERCIAL_PARK_EARNING;
                properties[t + COMMERCIAL_PARK_TIME] = { t: 0, p: 0, c: 1 }; 
            }
        }
    }

    let time = n;
    const result = [];
    while (time > 0 && properties[time] !== null) {
        const { t, p, c } = properties[time];
        result.unshift(`T: ${t} P: ${p} C: ${c}`);
        if (t === 1) {
            time -= THEATRE_TIME;
        } else if (p === 1) {
            time -= PUB_TIME;
        } else if (c === 1) {
            time -= COMMERCIAL_PARK_TIME;
        }
    }

    const output = {
        timeUnit: n,
        earnings: solArr[n],
        solutions: result.map((solution, index) => `${index + 1}. ${solution}`)
    };

    return output;
}

const timeUnits = 13;
const output = calculateOptimalProperties(timeUnits);

console.log(`Time units: ${timeUnits}`);
console.log(`Time Unit: ${output.timeUnit}`);
console.log(`Earnings: $${output.earnings}`);
console.log(`Solutions:`);
output.solutions.forEach((solution) => {
    console.log(solution);
});
