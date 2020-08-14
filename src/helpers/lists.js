function acft(side, series, weight, moment) {
    return {
        side,
        series,
        weight,
        moment,
        arm: (Math.round(moment/weight*10000)/100).toFixed(2),
        id: side+series
    };
}

const aircraftList = [
    acft('unk','B', 0, 0),
    acft('unk','C', 0, 0),
    acft('050','C', 2150.1, 2509.59),
    acft('051','C', 2152.7, 2501.44),
    acft('056','C', 2103.93, 2460.63),
    acft('057','C', 2144.38, 2493.33),
    acft('058','C', 2144.8, 2507.23),
    acft('060','C', 2152.83, 2519.12),
    acft('061','C', 2136.7, 2481.8),
    acft('062','C', 2150.1, 2494.85),
    acft('063','C', 2147.7, 2506.78),
    acft('065','C', 2146.2, 2502.22),
    acft('066','C', 2161.83, 2518.63),
    acft('067','C', 2168.65, 2522.45),
    acft('069','C', 2138.2, 2490.94),
    acft('070','C', 2126.2, 2471.41),
    acft('071','C', 2146.7, 2500.00),
    acft('072','C', 2140.2, 2503.33),
    acft('074','C', 2119.73, 2478.04),
    acft('075','C', 2147.7, 2487.45),
    acft('076','C', 2122.7, 2462.33),
    acft('077','C', 2127.7, 2479.09),
    acft('078','C', 2148.3, 2490.26),
    acft('079','C', 2138.7, 2509.93),
    acft('080','C', 2149.97, 2497.2),
    acft('082','C', 2155.63, 2507.14),
    acft('083','C', 2145.37, 2493.77),
    acft('084','C', 2131.33, 2475.36),
    acft('085','C', 2157.2, 2502.05),
    acft('086','C', 2161.2, 2512.93),
    acft('087','C', 2135.5, 2481.65),
    acft('088','C', 2158.2, 2509.46),
    acft('089','C', 2138.85, 2485.27),
    acft('090','C', 2166.2, 2499.53),
    acft('092','C', 2125.67, 2476.46),
    acft('093','C', 2150.2, 2503.18),
    acft('094','C', 2155.3, 2510.05),
    acft('095','C', 2167.57, 2515.27),
    acft('096','C', 2162.98, 2514.94),
    acft('097','C', 2148.2, 2491.47),
    acft('098','C', 2139.4, 2482.87),
    acft('099','C', 2134.2, 2471.76),
    acft('100','C', 2154.4, 2504.45),
    acft('101','C', 2104.7, 2451.88),
    acft('102','C', 2146.32, 2491.43),
    acft('103','C', 2146.37, 2490.89),
    acft('104','C', 2154.3, 2502.21),
    acft('106','C', 2154.77, 2514.95),
    acft('107','C', 2154.8, 2503.75),
    acft('108','C', 2144.33, 2491.94),
    acft('109','C', 2141.7, 2497.99),
    acft('110','C', 2150.3, 2496.01),
    acft('112','C', 2147.3, 2494.86),
    acft('113','C', 2119.2, 2469.86),
    acft('114','C', 2158.2, 2540.25),
    acft('115','C', 2150.3, 2501.42),
    acft('116','C', 2134.27, 2480.2),
    acft('117','C', 2155.14, 2503.49),
    acft('118','C', 2146.13, 2498.18),
    acft('120','C', 2135.83, 2496.22),
    acft('121','C', 2153.28, 2504.05),
    acft('122','C', 2141.3, 2486.08),
    acft('125','C', 2141.24, 2488.49),
    acft('126','C', 2139.43, 2487.83),
    acft('127','C', 2148.33, 2507.44),
    acft('128','C', 2145.3, 2495.01),
    acft('129','C', 2166.13, 2512.96),
    acft('130','C', 2151.2, 2499.99),
    acft('131','C', 2127.9, 2508.82),
    acft('133','C', 2154.43, 2506.58),
    acft('134','C', 2140.7, 2486.7),
    acft('135','C', 2156.73, 2507.55),
    acft('136','C', 2155.7, 2511.57),
    acft('137','C', 2140.33, 2484.8),
    //Bravos start here
    acft('140','B', 1982.96, 2360.01),
    acft('141','B', 1979.5, 2342.89),
    acft('142','B', 1972.1, 2324.78),
    acft('143','B', 1986.53, 2344.25),
    acft('144','B', 1964, 2330.78),
    acft('145','B', 1975.9, 2295.73),
    acft('146','B', 1995.2, 2338.46),
    acft('147','B', 1995.6, 2350.04),
    acft('148','B', 1986.8, 2359.7),
    acft('149','B', 1977.7, 2350.01),
    acft('150','B', 1968.83, 2340.83),
    acft('153','B', 2010.5, 2380.56),
    acft('154','B', 2012.7, 2368.32),
    acft('155','B', 1965.83, 2343.55),
    acft('156','B', 1998.00, 2364.95),
    acft('157','B', 2022.5, 2402.79),
    acft('158','B', 2008.00, 2375.46),
    acft('159','B', 1982.53, 2328.95),
    acft('160','B', 2014.5, 2389.02),
    acft('161','B', 1981.5, 2342.1),
    acft('162','B', 2020.5, 2386.09),
    acft('164','B', 2018.2, 2385.51),
    acft('165','B', 1994.3, 2376.69),
    acft('166','B', 1996.2, 2340.29),
    acft('167','B', 1969.33, 2330.08),
    acft('168','B', 2033, 2396.09),
    acft('169','B', 2012.5, 2392.16),
    acft('171','B', 1967.7, 2319.64),
    acft('173','B', 1994.2, 2348.51),
    acft('174','B', 2002.2, 2363.53),
    acft('176','B', 1971.33, 2335.13),
    acft('181','B', 1993.63, 2365.31),
    acft('182','B', 2009.6, 2373.36),
    acft('183','B', 1981.23, 2334.01),
    acft('184','B', 1978.5, 2336.7),
    acft('185','B', 1959.46, 2322.95),
    acft('186','B', 1987.5, 2361.03),
    acft('187','B', 1982.23, 2330.82),
    acft('188','B', 1983.83, 2359.28),
    acft('189','B', 1971.2, 2322.7),
    acft('190','B', 1963.8, 2326.18)
];

const getAcftById = id => aircraftList.find(aircraft => aircraft.id === id);

const getHeaviestAndMostForward = series => {
    let seriesAircraft = aircraftList.filter(aircraft => aircraft.series === series);
    let heaviest = seriesAircraft.reduce((accum, current) => (accum.weight > current.weight ? accum : current));
    let mostFwdAircraft = seriesAircraft.reduce((accum, current) => (accum.arm < current.arm ? accum : current));;
    return ([heaviest.weight, mostFwdAircraft.weight, mostFwdAircraft.moment]);
}

function inst8(name, weight) {
    return {
        name,
        weight,
        sqd: 'HT- 8',
        wet: weight + 18,
        dry: weight + 10,
        id: `${name}: HT-8`
    }
}

const instList8 = [
    inst8('CO KAMAN', 155),
    inst8('KAMAN', 155),
    inst8('XO ONEILL',238),
    inst8('ONEILL',238),
    inst8('BEATTIE',210),
    inst8('BLACK',210),
    inst8('BENGE',227),
    inst8('BUEHLER',220),
    inst8('BROWN,R',197),
    inst8('CAHILL',150),
    inst8('CANHAM',200),
    inst8('CARPIO',128),
    inst8('CERNY',175),
    inst8('CHINO',180),
    inst8('COLETTA',160),
    inst8('COLLINS',207),
    inst8('COLUNGA',182),
    inst8('CRAFT',167),
    inst8('CUNNINGHAM,E',172),
    inst8('CUNNINGHAM,G',165),
    inst8('DIDIER',175),
    inst8('EDWARDS',145),
    inst8('ENZINGER',185),
    inst8('FLOWERS',190),
    inst8('FROSLEE',147),
    inst8('GARCIA',171),
    inst8('GAY',190),
    inst8('GEHRKE',235),
    inst8('GORNTO',195),
    inst8('GREINER',142),
    inst8('GRIFFIN',270),
    inst8('HAND',190),
    inst8('HARDERS',174),
    inst8('HARNED',190),
    inst8('HENNING',216),
    inst8('HERRERA',149),
    inst8('HOFFMAN',230),
    inst8('HOLLINGER',230),
    inst8('HORN',235),
    inst8('HORNER',176),
    inst8('KADZ',185),
    inst8('KAMENSKY',182),
    inst8('KIFFER',200),
    inst8('KILGORE',195),
    inst8('LEE',215),
    inst8('LINSKY',142),
    inst8('LOTT',190),
    inst8('LOWD',200),
    inst8('LUTZ',210),
    inst8('MAHNE',160),
    inst8('MARIE',180),
    inst8('MAYNARD',155),
    inst8('MAZEL',220),
    inst8('MCCABE',220),
    inst8('MCCRAY',180),
    inst8('MCGUCKIN',175),
    inst8('MEIER',230),
    inst8('MELICK',175),
    inst8('MURPHY',220),
    inst8('OCONNELL',155),
    inst8('PALMER',222),
    inst8('PERMENTER',181),
    inst8('POWANDA',170),
    inst8('RANUM',155),
    inst8('REGIS',160),
    inst8('RILEY',190),
    inst8('RIVERA',225),
    inst8('ROYER',175),
    inst8('SCHNEIDER',187),
    inst8('SCHULTZ',200),
    inst8('SCOTT',210),
    inst8('SEIDERS',200),
    inst8('SMOAK',180),
    inst8('SOMMA',165),
    inst8('SPENCER',165),
    inst8('STEFFEN',183),
    inst8('STURGIS',195),
    inst8('SYKORA',167),
    inst8('TASNEY',235),
    inst8('TEAL',205),
    inst8('TELLES-GOINS',160),
    inst8('THOMAS',165),
    inst8('USNER',210),
    inst8('VANDAL',175),
    inst8('VANDENBROEKE',200),
    inst8('WEBB',180),
    inst8('WELLS',190),
    inst8('WERRELL',220),
    inst8('WILLIAMS,P',255),
    inst8('WRIGHT',215)
];

function instHITU(name, weight) {
    
    return {
        name,
        weight,
        sqd: 'HITU',
        wet: weight + 18,
        dry: weight + 10,
        id: `${name}: HITU`
    }
}

const instListHITU = [
    instHITU('LAMI',216),
    instHITU('SCOTT',210),
    instHITU('CHAMBERS',210),
    instHITU('WRIGHT',152),
    instHITU('FROSLEE',147),
    instHITU('ROSENAU',170)
];

function instTW5(name, weight) {
    
    return {
        name,
        weight,
        sqd: 'TW-5',
        wet: weight + 18,
        dry: weight + 10,
        id: `${name}: TW-5`
    }
}

const instListTW5 = [
    instTW5('ROSA',175),
    instTW5('LABERGE',210),
    instTW5('FARMER',250),
    instTW5('SULPIZIO',180),
    instTW5('ROBBINS',180)
];

function inst18(name, wet) {
    
    return {
        name,
        weight: wet-30,
        sqd: 'HT-18',
        wet,
        dry: wet - 10,
        id: `${name}: HT-18`
    }
}

const instList18 = [
    inst18('CO',200),
    inst18('XO',220),
    inst18('ALLEN',185),
    inst18('ANGEL',210),
    inst18('AUSTIN',230),
    inst18('BARTH',200),
    inst18('BAUM',240),
    inst18('BELANGER',175),
    inst18('BILDZUKEWICZ',160),
    inst18('BORNEMAN',190),
    inst18('BROWN',175),
    inst18('BURGESS',200),
    inst18('BUTLER',210),
    inst18('COFSKY',220),
    inst18('CRAFT',185),
    inst18('CROWNOVER',240),
    inst18('CRYSLER',215),
    inst18('CULLEN',230),
    inst18('CULP',230),
    inst18('DAVIS',220),
    inst18('DONATI',200),
    inst18('ELLIS',165),
    inst18('EVANSKI',250),
    inst18('FALCE',230),
    inst18('GAWNE',210),
    inst18('GUARD',190),
    inst18('HAGLUND',195),
    inst18('HALLER',160),
    inst18('HANS',230),
    inst18('HARRINGTON',240),
    inst18('HAST',230),
    inst18('HECK',240),
    inst18('HELLER',255),
    inst18('HORNER',180),
    inst18('HOUSEMAN',200),
    inst18('HUMPHREYS',200),
    inst18('JANOSKY',205),
    inst18('KANGAS',150),
    inst18('KEEF',200),
    inst18('KELLY',185),
    inst18('LANASA',225),
    inst18('LEIBOVICH',200),
    inst18('LOEB',220),
    inst18('LORENZ',200),
    inst18('MACUS',220),
    inst18('MANNARINO',170),
    inst18('MCKIE',210),
    inst18('MILLER',190),
    inst18('MILLIS',170),
    inst18('MULHOLLAND',225),
    inst18('NELSON,R',225),
    inst18("O'CONNELL",225),
    inst18('PARSONS,N',240),
    inst18('PARSONS,R',200),
    inst18('PETROSINO',190),
    inst18('PICHA',210),
    inst18('REGIS',245),
    inst18('ROBIE',155),
    inst18('ROSEANO',210),
    inst18('ROSEANU',190),
    inst18('SCARFO',220),
    inst18('SCHEIMREIF',250),
    inst18('SCHUBRING',225),
    inst18('SCOTT',220),
    inst18('SING',145),
    inst18('SIVERS',230),
    inst18('SKALSKI',175),
    inst18('SNELL',215),
    inst18('SPARKOWSKI',220),
    inst18('SPLATT',230),
    inst18('SPURLIN',220),
    inst18('STERRETT',190),
    inst18('TYLER',230),
    inst18('TYRON',230),
    inst18('WALDRON',225),
    inst18('WEPPLO',165),
    inst18('WILL',185)
];

function inst28(name, wet) {
    return {
        name,
        weight: wet-30,
        sqd: 'HT-28',
        wet,
        dry: wet - 10,
        id: `${name}: HT-28`
    }
}

const instList28 = [//wet weight
    inst28('ASPHOLM',200),
    inst28('BASTEMEYER',230),
    inst28('BAXTER',220),
    inst28('BLUME',240),
    inst28('BREAK',165),
    inst28('BUGBEE',240),
    inst28('CHAMBERS',240),
    inst28('CARD',200),
    inst28('CHANG',195),
    inst28('CLARK',210),
    inst28('COCO',200),
    inst28('COLLINS',170),
    inst28('COOPER',220),
    inst28('COUILLARD',210),
    inst28('CURRY',220),
    inst28('CURTIS',220),
    inst28('DAU',220),
    inst28('DAVIS,J',245),
    inst28('DAVIS,N',170),
    inst28('DEBBINK',215),
    inst28('EGAN',240),
    inst28('ELLWOOD',230),
    inst28('FREEMAN',205),
    inst28('GIBBONS',248),
    inst28('GORMLEY',200),
    inst28('GOULD',220),
    inst28('GRANCAGNOLO',260),
    inst28('GYZBOWSKI',240),
    inst28('HAFENSTEINER',150),
    inst28('HELGERSON',245),
    inst28('HILL',205),
    inst28('HOPPER',190),
    inst28('HUDSON',250),
    inst28('ISBELL',220),
    inst28('JACOBS',255),
    inst28('JUDD',190),
    inst28('KARR',210),
    inst28('KELLNER',230),
    inst28('KENSHALO',210),
    inst28('KERZIE',170),
    inst28('KLUMP',285),
    inst28('KLYNMAN',160),
    inst28('KOLCZYNSKI',240),
    inst28('KORVER',215),
    inst28('KROLL',165),
    inst28('LENICK',215),
    inst28('LONG',230),
    inst28('MARCUM',180),//need weight
    inst28('MARTIN',260),
    inst28('MAUSTELLER',255),
    inst28('MCKERREN',255),
    inst28('MINETTE',210),
    inst28('MOORE',230),
    inst28('MOURITSEN',210),//need weight
    inst28('NEASE',205),
    inst28("O'BRIEN",180),
    inst28('OUELLETTE',215),
    inst28('PAGLIARULO',200),
    inst28('PARKINGTON',175),
    inst28('PAVELKO',210),
    inst28('PELZER',265),
    inst28('PETERSEN',260),
    inst28('PUSINS',225),
    inst28('REYNOLDS',235),
    inst28('SHIPP',230),
    inst28('SKELLEY',195),
    inst28('SLEEPER',220),
    inst28('SNIPES',180),
    inst28('SONCINI',245),
    inst28('STEWART',205),//need weight
    inst28('STILES',190),
    inst28('STREFF',210),
    inst28('SWEENEY',215),
    inst28('TEMPLIN',205),
    inst28('TOPP',190),
    inst28('TRAMELL',240),
    inst28('TREMAINE',245),
    inst28('TROUBLEFIELD',220),
    inst28('UMEMURA',230),
    inst28('VIRDEN',215),
    inst28('WARD',240),
    inst28('WEBB',250),
    inst28('WEITHMAN',210),
    inst28('WESTERMANN',220),
    inst28('WHEATON',200),
    inst28('WILLSEY',260),
    inst28('WOOTEN',210),
    inst28('WRIGHT',175),
    inst28('YODER',230)
];

const instructorList = [
    {
        name: 'Santa',
        weight: 190,
        sqd: 'TW-5',
        wet: 220,
        dry: 210,
        id: 'SANTA: TW-5'
    },
    ...instList8,
    ...instList18,
    ...instList28,
    ...instListHITU,
    ...instListTW5
];

const getInstById = id => instructorList.find(inst => inst.id === id);

export {
    aircraftList, 
    getAcftById,
    getHeaviestAndMostForward,
    instructorList,
    getInstById
};