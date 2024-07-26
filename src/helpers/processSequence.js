/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import { allPass, equals, filter, includes, length, not, nth, pipe, split, tap } from 'ramda';
import Api from '../tools/api';
import { round } from 'lodash';

 const api = new Api();

 const processSequence = ({value, writeLog, handleSuccess, handleError}) => {

    const isNull = equals(0);
    const getFirstElement = nth(0);
    const getIntegerPartOfNumber = (v) => pipe(
        split,
        getFirstElement
    )('.', v);
    const lengthIntegerPartOfNumber = pipe(
        getIntegerPartOfNumber,
        length
    )
    const isLengthLessThen10 = (v) => lengthIntegerPartOfNumber(v) < 10;
    const isLengtGreaterThen2 = (v) => lengthIntegerPartOfNumber(v) > 2;
    const isPositive = (v) => +v > 0;
    const isDecimalString = (n) => pipe(
        includes,
        not
    )(n, '0123456789.');
    const isDecimalFloatOrInteger = (v) => pipe(
        filter,
        length,
        isNull
    )(isDecimalString, split('', v))

    const log = tap(writeLog)
    const sqr = (n) => n ** 2;
    const mod3 = (n) => n % 3;

    const processResult = pipe(
        log,
        length,
        log,
        sqr,
        log,
        mod3,
        log
    );
    

    if (!allPass([getIntegerPartOfNumber, isLengthLessThen10, isLengtGreaterThen2, isPositive, isDecimalFloatOrInteger])(value)) {
        handleError('ValidationError');
    } else {
        const roundedNumber = round(+value);
        writeLog(roundedNumber);


        api.get('https://api.tech/numbers/base', {from: 10, to: 2, number: String(roundedNumber)}).then(({result}) => {
            const mod3Result = processResult(result);
            return api.get(`https://animals.tech/${mod3Result}`, {})
        }).then(({result}) => {
            handleSuccess(result);
        }).catch((err) => handleError(err))
    }
 }

export default processSequence;
