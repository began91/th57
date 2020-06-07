function acft(side, series, weight, moment) {
    return {
        side,
        series,
        weight,
        moment,
        arm: (Math.round(moment/weight*1000)/10).toFixed(1),
        display: side + ' ' + series,
        id: side+series
    };
}

const aircraftList = [
    acft('N/A','B', 0, 0),
    acft('N/A','C', 0, 0),
    acft('050','C', 2160.3, 2561.0),
    acft('051','C', 2155.5, 2544.3),
    acft('056','C', 2115.1, 2511.8),
    acft('057','C', 2155.6, 2544.5),
    acft('058','C', 2157.8, 2559.6),
    acft('060','C', 2144.6, 2539.4),
    acft('061','C', 2136.7, 2481.8),
    acft('062','C', 2150.1, 2494.9),
    acft('063','C', 2158.9, 2558.0),
    acft('065','C', 2146.2, 2502.2),
    acft('066','C', 2173.0, 2569.8),
    acft('067','C', 2179.9, 2573.6),
    acft('103','C', 2153.4, 2484.0),
    acft('140','B', 1965.7, 2341.6),
    acft('145','B', 1961.1, 2286.3),
    acft('168','B', 2007.7, 2374.5),
    acft('169','B', 1978.6, 2336.7),
    acft('190','B', 1963.8, 2326.2)
];

function inst(fname, lname, weight, sqd) {
    return {
        fname,
        lname,
        weight,
        sqd,
        wet: weight + 18,
        dry: weight + 10,
        id: lname+fname,
        display: `${lname},${fname}: ${weight+10}|${weight+18}`
    }
}

const instructorList = [
    inst('Mif','Monster',200,'IUT'),
    inst('B','Egan',210,'HT-28'), 
    inst('J','Gallagher',225,'IUT'),  
    inst('S','Greiner',200,'HT-18')
];

export {aircraftList, instructorList};