"use strict";

// Выражения запускаются по отдельности; для typeof null/NaN ниже показаны
// и значение выражения, и тип возвращённой строки.
console.log('"8" + 2:', "8" + 2, typeof ("8" + 2));
console.log('"8" - 2:', "8" - 2, typeof ("8" - 2));
console.log('Number("8") + 2:', Number("8") + 2, typeof (Number("8") + 2));
console.log('"12" > "3":', "12" > "3", typeof ("12" > "3"));
console.log('12 === "12":', 12 === "12", typeof (12 === "12"));
console.log('Number(""):', Number(""), typeof Number(""));
console.log('Number("text"):', Number("text"), typeof Number("text"));
console.log('Boolean("false"):', Boolean("false"), typeof Boolean("false"));
console.log("typeof null:", typeof null, typeof (typeof null));
console.log("typeof NaN:", typeof NaN, typeof (typeof NaN));
