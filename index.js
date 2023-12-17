"use strict";

var __PS_MV_REG;

function inBrowserP() {
    __PS_MV_REG = [];
    return !inNodeP();
};

function inNodeP() {
    return !window;
};

var util;

var inspect;

if (inNodeP()) {
    util = require('util');
    inspect = function (x) {
        return util.inspect(x);
    };
} else {
    inspect = function (x) {
        if (x === null) {
            return 'null';
        } else {
            return x.toString();
        };
    };
};

var mytests = {  };





function MyTestFailure() {
    var tmp = Error.apply(this, arguments);
    this.name = 'MyTestFailure';
    tmp.name = this.name;
    this.message = tmp.message;
    Object.defineProperty(this, 'stack', { 'get' : function () {
        return tmp.stack;
    } });
    return this;
};

function runTests() {
    var results = [];
    var failures = [];
    var checks = 0;
    var pass = 0;
    var fail = 0;
    var emit = function (x) {
        return results.push(x);
    };
    var pass1 = function () {
        ++checks;
        return ++pass;
    };
    var fail2 = function (test, reason) {
        ++checks;
        ++fail;
        return failures.push({ 'test' : test, 'reason' : reason });
    };
    for (var key in mytests) {
        try {
            mytests[key](pass1);
        } catch (e) {
            fail2(key, e.message);
        };
    };
    emit('Did ' + checks + ' checks.');
    emit('Pass: ' + pass + ', Fail: ' + fail);
    for (var failure = null, _js_idx3 = 0; _js_idx3 < failures.length; _js_idx3 += 1) {
        failure = failures[_js_idx3];
        emit(failure.test + ': ' + failure.reason);
    };
    __PS_MV_REG = [];
    return results;
};

function pr() {
    var args = Array.prototype.slice.call(arguments, 0);
    __PS_MV_REG = [];
    return console.log.apply(console, args);
};

function Cons(a, b) {
    this.percentcar = a;
    this.percentcdr = b;
    return;
};

function percentinspectCons() {
    var listToArray = function (list) {
        var result = [];
        var list = list;
        while (true) {
            loopContinue230: {
                if (list === null) {
                    return result;
                } else {
                    result.push(car(list));
                    var _js4 = cdr(list);
                    list = _js4;
                    __PS_MV_REG = [];
                    break loopContinue230;
                };
            };
        };
    };
    if (trueListp(this)) {
        __PS_MV_REG = [];
        return '(' + listToArray(this).map(inspect).join(' ') + ')';
    } else {
        __PS_MV_REG = [];
        return '(' + inspect(this.percentcar) + ' . ' + inspect(this.percentcdr) + ')';
    };
};

if (inNodeP()) {
    Cons.prototype[util.inspect.custom] = percentinspectCons;
} else {
    Cons.prototype.toString = percentinspectCons;
};

Cons.prototype.car = function () {
    return this.percentcar;
};

Cons.prototype.cdr = function () {
    return this.percentcdr;
};

function cons(a, b) {
    __PS_MV_REG = [];
    return new Cons(a, b);
};

function car(x) {
    return x.car();
};

function cdr(x) {
    return x.cdr();
};

function consp(x) {
    return (x instanceof Cons);
};

function atom(x) {
    __PS_MV_REG = [];
    return !consp(x);
};

function listbang() {
    var args = Array.prototype.slice.call(arguments, 0);
    __PS_MV_REG = [];
    return args.reduceRight(function (acc, x) {
        __PS_MV_REG = [];
        return cons(x, acc);
    }, null);
};

function trueListp(x) {
    var x = x;
    while (true) {
        loopContinue241: {
            if (x === null) {
                return true;
            } else if (consp(x)) {
                var _js4 = cdr(x);
                x = _js4;
                __PS_MV_REG = [];
                break loopContinue241;
            } else {
                __PS_MV_REG = [];
                return false;
            };
        };
    };
};

mytests['consp.1'] = function (pass) {
    var result = consp(cons(1, 2));
    var expectedValue = true;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (CONSP (CONS 1 2)) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result4 = consp(123);
    var expectedValue5 = false;
    if (expectedValue5 === result4) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message6 = 'Expected (CONSP 123) to eval to F (of value ' + inspect(expectedValue5) + '), but it was ' + inspect(result4);
        throw new MyTestFailure(message6);
    };
};

mytests['test.1'] = function (pass) {
    var result = inspect(cons(1, 2));
    var expectedValue = '(1 . 2)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (CONS 1 2)) to eval to \"(1 . 2)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result7 = inspect(car(cons(1, 2)));
    var expectedValue8 = '1';
    if (expectedValue8 === result7) {
        pass();
    } else {
        var message9 = 'Expected (INSPECT (CAR (CONS 1 2))) to eval to \"1\", but it was ' + inspect(result7);
        throw new MyTestFailure(message9);
    };
    var result10 = inspect(car(cons(cons(11, 12), 2)));
    var expectedValue11 = '(11 . 12)';
    if (expectedValue11 === result10) {
        pass();
    } else {
        var message12 = 'Expected (INSPECT (CAR (CONS (CONS 11 12) 2))) to eval to \"(11 . 12)\", but it was ' + inspect(result10);
        throw new MyTestFailure(message12);
    };
    var result13 = inspect(cdr(cons(1, 2)));
    var expectedValue14 = '2';
    if (expectedValue14 === result13) {
        pass();
    } else {
        var message15 = 'Expected (INSPECT (CDR (CONS 1 2))) to eval to \"2\", but it was ' + inspect(result13);
        throw new MyTestFailure(message15);
    };
    var result16 = inspect(cdr(cons(1, 123)));
    var expectedValue17 = '123';
    if (expectedValue17 === result16) {
        pass();
    } else {
        var message18 = 'Expected (INSPECT (CDR (CONS 1 123))) to eval to \"123\", but it was ' + inspect(result16);
        throw new MyTestFailure(message18);
    };
    var result19 = inspect(cdr(cons(1, cons(2, 3))));
    var expectedValue20 = '(2 . 3)';
    if (expectedValue20 === result19) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message21 = 'Expected (INSPECT (CDR (CONS 1 (CONS 2 3)))) to eval to \"(2 . 3)\", but it was ' + inspect(result19);
        throw new MyTestFailure(message21);
    };
};

mytests['test.2'] = function (pass) {
    var result = trueListp(null);
    var expectedValue = true;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (TRUE-LISTP NIL) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result22 = trueListp(cons(1, 2));
    var expectedValue23 = false;
    if (expectedValue23 === result22) {
        pass();
    } else {
        var message24 = 'Expected (TRUE-LISTP (CONS 1 2)) to eval to F (of value ' + inspect(expectedValue23) + '), but it was ' + inspect(result22);
        throw new MyTestFailure(message24);
    };
    var result25 = trueListp(cons(1, null));
    var expectedValue26 = true;
    if (expectedValue26 === result25) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message27 = 'Expected (TRUE-LISTP (CONS 1 NIL)) to eval to T, but it was ' + inspect(result25);
        throw new MyTestFailure(message27);
    };
};

mytests['test.3'] = function (pass) {
    var result = inspect(listbang(1));
    var expectedValue = '(1)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (LIST! 1)) to eval to \"(1)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result28 = inspect(listbang(1, 2));
    var expectedValue29 = '(1 2)';
    if (expectedValue29 === result28) {
        pass();
    } else {
        var message30 = 'Expected (INSPECT (LIST! 1 2)) to eval to \"(1 2)\", but it was ' + inspect(result28);
        throw new MyTestFailure(message30);
    };
    var result31 = inspect(listbang(1, 2, 3));
    var expectedValue32 = '(1 2 3)';
    if (expectedValue32 === result31) {
        pass();
    } else {
        var message33 = 'Expected (INSPECT (LIST! 1 2 3)) to eval to \"(1 2 3)\", but it was ' + inspect(result31);
        throw new MyTestFailure(message33);
    };
    var result34 = inspect(listbang(listbang(1, 2), listbang(3, 4), listbang(5, 6)));
    var expectedValue35 = '((1 2) (3 4) (5 6))';
    if (expectedValue35 === result34) {
        pass();
    } else {
        var message36 = 'Expected (INSPECT (LIST! (LIST! 1 2) (LIST! 3 4) (LIST! 5 6))) to eval to \"((1 2) (3 4) (5 6))\", but it was ' + inspect(result34);
        throw new MyTestFailure(message36);
    };
    if (inNodeP()) {
        var result37 = inspect(listbang('foo', 'bar'));
        var expectedValue38 = '(\'foo\' \'bar\')';
        if (expectedValue38 === result37) {
            pass();
        } else {
            var message39 = 'Expected (INSPECT (LIST! \"foo\" \"bar\")) to eval to \"(\'foo\' \'bar\')\", but it was ' + inspect(result37);
            throw new MyTestFailure(message39);
        };
    } else {
        var result40 = inspect(listbang('foo', 'bar'));
        var expectedValue41 = '(foo bar)';
        if (expectedValue41 === result40) {
            pass();
        } else {
            var message42 = 'Expected (INSPECT (LIST! \"foo\" \"bar\")) to eval to \"(foo bar)\", but it was ' + inspect(result40);
            throw new MyTestFailure(message42);
        };
    };
    var result43 = inspect(listbang({ 'foo' : 1, 'bar' : 2 }));
    var expectedValue44 = '({ foo: 1, bar: 2 })';
    if (expectedValue44 === result43) {
        pass();
    } else {
        var message45 = 'Expected (INSPECT (LIST! (CREATE :FOO 1 :BAR 2))) to eval to \"({ foo: 1, bar: 2 })\", but it was ' + inspect(result43);
        throw new MyTestFailure(message45);
    };
    var result46 = inspect(listbang({ 'foo' : listbang(1, 2, 3), 'bar' : listbang(10, 20) }));
    var expectedValue47 = '({ foo: (1 2 3), bar: (10 20) })';
    if (expectedValue47 === result46) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message48 = 'Expected (INSPECT (LIST! (CREATE :FOO (LIST! 1 2 3) :BAR (LIST! 10 20)))) to eval to \"({ foo: (1 2 3), bar: (10 20) })\", but it was ' + inspect(result46);
        throw new MyTestFailure(message48);
    };
};

mytests['true-listp/no-stack-overflow.1'] = function (pass) {
    var result = trueListp(makeList(60000, 1));
    var expectedValue = true;
    if (expectedValue === result) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message = 'Expected (TRUE-LISTP (MAKE-LIST 60000 1)) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
};

function map(fn, list) {
    __PS_MV_REG = [];
    return list === null ? null : cons(fn(car(list)), map(fn, cdr(list)));
};

mytests['map.1'] = function (pass) {
    var result = map(function (x) {
        return x;
    }, null);
    var expectedValue = null;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (MAP (LAMBDA (X) X) NIL) to eval to NIL, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result49 = inspect(map(function (x) {
        return x + 1;
    }, listbang(1)));
    var expectedValue50 = '(2)';
    if (expectedValue50 === result49) {
        pass();
    } else {
        var message51 = 'Expected (INSPECT (MAP (LAMBDA (X) (1+ X)) (LIST! 1))) to eval to \"(2)\", but it was ' + inspect(result49);
        throw new MyTestFailure(message51);
    };
    var result52 = inspect(map(function (x) {
        return x + 1;
    }, listbang(0, 1, 2)));
    var expectedValue53 = '(1 2 3)';
    if (expectedValue53 === result52) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message54 = 'Expected (INSPECT (MAP (LAMBDA (X) (1+ X)) (LIST! 0 1 2))) to eval to \"(1 2 3)\", but it was ' + inspect(result52);
        throw new MyTestFailure(message54);
    };
};

mytests['evenp/oddp.1'] = function (pass) {
    var result = !(0 % 2);
    var expectedValue = true;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (EVENP 0) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result55 = 0 % 2 || false;
    var expectedValue56 = false;
    if (expectedValue56 === result55) {
        pass();
    } else {
        var message57 = 'Expected (OR (ODDP 0) F) to eval to F (of value ' + inspect(expectedValue56) + '), but it was ' + inspect(result55);
        throw new MyTestFailure(message57);
    };
    var result58 = !(2 % 2);
    var expectedValue59 = true;
    if (expectedValue59 === result58) {
        pass();
    } else {
        var message60 = 'Expected (EVENP 2) to eval to T, but it was ' + inspect(result58);
        throw new MyTestFailure(message60);
    };
    var result61 = !(3 % 2);
    var expectedValue62 = false;
    if (expectedValue62 === result61) {
        pass();
    } else {
        var message63 = 'Expected (EVENP 3) to eval to F (of value ' + inspect(expectedValue62) + '), but it was ' + inspect(result61);
        throw new MyTestFailure(message63);
    };
    var result64 = 3 % 2 && true;
    var expectedValue65 = true;
    if (expectedValue65 === result64) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message66 = 'Expected (AND (ODDP 3) T) to eval to T, but it was ' + inspect(result64);
        throw new MyTestFailure(message66);
    };
};

function filter(fn, list) {
    var rev = function (list) {
        var list = list;
        var acc = null;
        while (true) {
            loopContinue435: {
                if (list === null) {
                    return acc;
                } else {
                    var _js69 = cdr(list);
                    var _js70 = cons(car(list), acc);
                    list = _js69;
                    acc = _js70;
                    __PS_MV_REG = [];
                    break loopContinue435;
                };
            };
        };
    };
    var rec = function (list, acc) {
        var list = list;
        var acc = acc;
        while (true) {
            loopContinue451: {
                if (list === null) {
                    __PS_MV_REG = [];
                    return rev(acc);
                } else {
                    if (fn(car(list))) {
                        var _js69 = cdr(list);
                        var _js70 = cons(car(list), acc);
                        list = _js69;
                        acc = _js70;
                        __PS_MV_REG = [];
                        break loopContinue451;
                    } else {
                        var _js71 = cdr(list);
                        var _js72 = acc;
                        list = _js71;
                        acc = _js72;
                        __PS_MV_REG = [];
                        break loopContinue451;
                    };
                };
            };
        };
    };
    __PS_MV_REG = [];
    return rec(list, null);
};

mytests['filter.1'] = function (pass) {
    var result = inspect(filter(function (x) {
        return !(x % 2);
    }, listbang(0, 7, 8, 8, 43, -4)));
    var expectedValue = '(0 8 8 -4)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (FILTER (LAMBDA (X) (EVENP X)) (LIST! 0 7 8 8 43 -4))) to eval to \"(0 8 8 -4)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result67 = inspect(filter(function (x) {
        return !(x % 2);
    }, makeList(60000, 1)));
    var expectedValue68 = 'null';
    if (expectedValue68 === result67) {
        pass();
    } else {
        var message69 = 'Expected (INSPECT (FILTER (LAMBDA (X) (EVENP X)) (MAKE-LIST 60000 1))) to eval to \"null\", but it was ' + inspect(result67);
        throw new MyTestFailure(message69);
    };
    var result70 = inspect(filter(function (x) {
        return !(x % 2);
    }, cons(2, makeList(60000, 1))));
    var expectedValue71 = '(2)';
    if (expectedValue71 === result70) {
        pass();
    } else {
        var message72 = 'Expected (INSPECT (FILTER (LAMBDA (X) (EVENP X)) (CONS 2 (MAKE-LIST 60000 1)))) to eval to \"(2)\", but it was ' + inspect(result70);
        throw new MyTestFailure(message72);
    };
    var result73 = inspect(lengthbang(filter(function (x) {
        return !(x % 2);
    }, makeList(60000, 0))));
    var expectedValue74 = '60000';
    if (expectedValue74 === result73) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message75 = 'Expected (INSPECT (LENGTH! (FILTER (LAMBDA (X) (EVENP X)) (MAKE-LIST 60000 0)))) to eval to \"60000\", but it was ' + inspect(result73);
        throw new MyTestFailure(message75);
    };
};

function makeList(n, fill) {
    var list = null;
    for (var _js76 = 0; _js76 < n; _js76 += 1) {
        list = cons(fill, list);
    };
    __PS_MV_REG = [];
    return list;
};

mytests['make-list.1'] = function (pass) {
    var result = inspect(makeList(3, 1));
    var expectedValue = '(1 1 1)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (MAKE-LIST 3 1)) to eval to \"(1 1 1)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    if (inNodeP()) {
        var result77 = inspect(makeList(5, {  }));
        var expectedValue78 = '({} {} {} {} {})';
        if (expectedValue78 === result77) {
            __PS_MV_REG = [];
            return pass();
        } else {
            var message79 = 'Expected (INSPECT (MAKE-LIST 5 (CREATE))) to eval to \"({} {} {} {} {})\", but it was ' + inspect(result77);
            throw new MyTestFailure(message79);
        };
    } else {
        var result80 = inspect(makeList(5, {  }));
        var expectedValue81 = '([object Object] [object Object] [object Object] [object Object] [object Object])';
        if (expectedValue81 === result80) {
            __PS_MV_REG = [];
            return pass();
        } else {
            var message82 = 'Expected (INSPECT (MAKE-LIST 5 (CREATE))) to eval to \"([object Object] [object Object] [object Object] [object Object] [object Object])\", but it was ' + inspect(result80);
            throw new MyTestFailure(message82);
        };
    };
};

function lengthbang(list) {
    var rec = function (list) {
        var list = list;
        var count = 0;
        while (true) {
            loopContinue522: {
                if (list === null) {
                    return count;
                } else {
                    var _js85 = cdr(list);
                    var _js86 = count + 1;
                    list = _js85;
                    count = _js86;
                    __PS_MV_REG = [];
                    break loopContinue522;
                };
            };
        };
    };
    __PS_MV_REG = [];
    return rec(list);
};

mytests['length!.1'] = function (pass) {
    var result = inspect(lengthbang(listbang()));
    var expectedValue = '0';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (LENGTH! (LIST!))) to eval to \"0\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result83 = inspect(lengthbang(listbang(1)));
    var expectedValue84 = '1';
    if (expectedValue84 === result83) {
        pass();
    } else {
        var message85 = 'Expected (INSPECT (LENGTH! (LIST! 1))) to eval to \"1\", but it was ' + inspect(result83);
        throw new MyTestFailure(message85);
    };
    var result86 = inspect(lengthbang(listbang(1, 2, 3)));
    var expectedValue87 = '3';
    if (expectedValue87 === result86) {
        pass();
    } else {
        var message88 = 'Expected (INSPECT (LENGTH! (LIST! 1 2 3))) to eval to \"3\", but it was ' + inspect(result86);
        throw new MyTestFailure(message88);
    };
    var result89 = inspect(lengthbang(makeList(60000, 1)));
    var expectedValue90 = '60000';
    if (expectedValue90 === result89) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message91 = 'Expected (INSPECT (LENGTH! (MAKE-LIST 60000 1))) to eval to \"60000\", but it was ' + inspect(result89);
        throw new MyTestFailure(message91);
    };
};

pr(runTests());
export { cons, car, cdr, listbang, atom, consp, filter };
