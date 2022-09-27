// `sort()` evaluates every element multiple times, which cannot be reduced using something called the Schwarzian transform.
// I crudely timed both the method below and `sort()` sorting an array of 199 numbers and there seems to be some truth to it.
// Unfortunately, it is also something I have just found out about, so I am hoping I'm on the right track here, but there is also a decent chance I have no idea what I'm talking about.
// A teaching moment for me.  :)

const sortNums = arr => {
  console.time('schwarz');
  const lengths = arr.map(function (e, i) {
    return { index: i, value: e };
  });

  lengths.sort(function (a, b) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });

  const sorted = lengths.map(function (e) {
    return arr[e.index];
  });
  console.timeEnd('schwarz');
  console.log(sorted);
};

sortNums([22, 75, 2, 44, 96, 12, 92, 34, 13, 37, 11]);

[22, 75, 2, 44, 96, 12, 92, 34, 13, 37, 11].sort((a, b) => a - b);
