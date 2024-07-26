/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { __, allPass, equals, filter, gte, length, propEq } from "ramda";

const getKeys = (obj) => Object.keys(obj);
const getOnlyOneColorLength = ({object, isColor}) => {
    return length(filter(key => isColor(key)(object), getKeys(object)))
}

const redStar = propEq('star', 'red');
const whiteStar = propEq('star', 'white');
const greenSquare = propEq('square', 'green');
const orangeSquare = propEq('square', 'orange');
const whiteTriangle = propEq('triangle', 'white');
const greenTriangle = propEq('triangle', 'green');
const whiteCircle = propEq('circle', 'white');
const blueCircle = propEq('circle', 'blue');

const isGreen = propEq(__, 'green');
const isRed = propEq(__, 'red');
const isBlue = propEq(__, 'blue');
const isOrange = propEq(__, 'orange');

const isEqual4 = equals(4);
const isEqual2 = equals(2);

const triangleEqualSquare = ({triangle, square}) => triangle === square; 

const getOnlyGreenShapeLength = (object) => getOnlyOneColorLength({object, isColor: isGreen})
const twoGreen = (object) => gte(getOnlyGreenShapeLength(object), 2);

const getOnlyRedShapeLength = (object) => getOnlyOneColorLength({object, isColor: isRed});
const getOnlyBlueShapeLength = (object) => getOnlyOneColorLength({object, isColor: isBlue});
const getOnlyOrangeShapeLength = (object) => getOnlyOneColorLength({object, isColor: isOrange});


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([redStar, greenSquare, whiteTriangle, whiteCircle])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = twoGreen

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (object) => getOnlyBlueShapeLength(object) === getOnlyRedShapeLength(object)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([blueCircle, redStar, orangeSquare])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (object) => Math.max(getOnlyBlueShapeLength(object), getOnlyGreenShapeLength(object), getOnlyRedShapeLength(object), getOnlyOrangeShapeLength(object)) >= 3

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (object) => greenTriangle(object) && isEqual2(getOnlyGreenShapeLength(object)) && getOnlyRedShapeLength(object) >= 1;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (object) => isEqual4(getOnlyOrangeShapeLength(object))

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (object) => !redStar(object) && !whiteStar(object)

// 9. Все фигуры зеленые.
export const validateFieldN9 = (object) => isEqual4(getOnlyGreenShapeLength(object))

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (object) => !whiteTriangle(object) && triangleEqualSquare(object)
