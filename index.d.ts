export interface Cons {
  percentcar: any;
  percentcdr: any;
}

export function greeter(name: string): string;

export function cons(a, b);
export function car(x: Cons);
export function cdr(x: Cons);

// export function listbang(...args): Cons | null;
export function listbang(): null;
export function listbang(arg, ...args): Cons;

export function consp(x): x is Cons;
export function atom(x): x is Exclude<typeof x, Cons>;

type List = Cons | null;

export function filter(fn: (input) => boolean, list: List);
