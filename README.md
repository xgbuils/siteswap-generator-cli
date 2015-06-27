# siteswap-generator-cli

A command line tool based on [siteswap-generator package](https://www.npmjs.com/package/siteswap-generator)

### Install
``` bash
$ npm install -g siteswap-generator-cli
```

### Usage
``` bash
$ siteswap -balls [<min>..]<max> -period [<min>..]<max> [-height [<min>..]<max>] [-slice <number>]
```
or
``` bash
$ siteswap -b [<min>..]<max> -p [<min>..]<max> [-h [<min>..]<max>] [-s <number>]
```

### Examples
``` bash
$ siteswap -b 3 -p 3 -h 5
[ [ 5, 3, 1 ],
  [ 5, 2, 2 ],
  [ 5, 0, 4 ],
  [ 4, 4, 1 ],
  [ 4, 2, 3 ],
  [ 5, 1 ],
  [ 4, 2 ],
  [ 3 ] ]
```

``` bash
$ siteswap -balls 1..3 -period 3..3 -height 5..5
[ [ 5, 3, 1 ], [ 5, 2, 2 ], [ 5, 0, 4 ], [ 5, 0, 1 ] ]
```

``` bash
$ #only the first 3 patterns 
$ siteswap -b 3 -p 3 -h 5 --slice 3
[ [ 5, 3, 1 ],
  [ 5, 2, 2 ],
  [ 5, 0, 4 ]]
```

## License
MIT