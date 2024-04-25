function calculateOptimalProperties(n) {
    const THEATRE_TIME = 5;
    const PUB_TIME = 4;
    const COMMERCIAL_PARK_TIME = 10;

    const THEATRE_EARNING = 1500;
    const PUB_EARNING = 1000;
    const COMMERCIAL_PARK_EARNING = 3000;

    const dp = Array(n + 1).fill(0);
    dp[0] = 0;

    const properties = Array(n + 1).fill(null);

    for (let t = 0; t <= n; t++) {
        if (dp[t] !== 0) {
            if (t + THEATRE_TIME <= n && dp[t] + THEATRE_EARNING > dp[t + THEATRE_TIME]) {
                dp[t + THEATRE_TIME] = dp[t] + THEATRE_EARNING;
                properties[t + THEATRE_TIME] = { t: 1, p: 0, c: 0 }; // Choose Theatre
            }
            if (t + PUB_TIME <= n && dp[t] + PUB_EARNING > dp[t + PUB_TIME]) {
                dp[t + PUB_TIME] = dp[t] + PUB_EARNING;
                properties[t + PUB_TIME] = { t: 0, p: 1, c: 0 }; // Choose Pub
            }
            if (t + COMMERCIAL_PARK_TIME <= n && dp[t] + COMMERCIAL_PARK_EARNING > dp[t + COMMERCIAL_PARK_TIME]) {
                dp[t + COMMERCIAL_PARK_TIME] = dp[t] + COMMERCIAL_PARK_EARNING;
                properties[t + COMMERCIAL_PARK_TIME] = { t: 0, p: 0, c: 1 }; // Choose Commercial Park
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

    return {
        timeUnit: n,
        earnings: dp[n],
        solutions: result.map((solution, index) => `${index + 1}. ${solution}`)
    };
}

const testCases = [7, 8, 13];

testCases.forEach((testCase, index) => {
    const output = calculateOptimalProperties(testCase);
    console.log(`Test Case ${index + 1}`);
    console.log(`Time Unit: ${output.timeUnit}`);
    console.log(`Earnings: $${output.earnings}`);
    console.log(`Solutions:`);
    output.solutions.forEach((solution) => {
        console.log(solution);
    });
    console.log('-------------------');
});
