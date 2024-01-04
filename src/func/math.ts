
export const gcd = (x: bigint, y: bigint): bigint=>{
	return x % y == 0n ? y : gcd(y, x % y);
}

export const lcm = (x: bigint, y: bigint): bigint => { 
	return x * y / gcd(x, y);
}

export const sqrt=(value:bigint)=> {
	if (value < 0n) {
		throw 'square root of negative numbers is not supported'
	}

	if (value < 2n) {
		return value;
	}

	function newtonIteration(n:bigint, x0:bigint) {
		const x1 = ((n / x0) + x0) >> 1n;
		if (x0 === x1 || x0 === (x1 - 1n)) {
			return x0;
		}
		return newtonIteration(n, x1);
	}

	return newtonIteration(value, 1n);
}
