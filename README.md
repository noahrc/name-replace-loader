# Name replacement loader for [webpack](http://webpack.github.io)

This loader replaces patterns in the name of modules using strings or regular expressions.

# Example

Given a source file named `example.foo.yml`

With this loader in your webpack config:

```
loaders: [
  {
    test: /\.yml$/,
    loader: 'file?name=[name].[ext]!name-replace?find=foo&replace=baz'
  }
]
```

A file would be output with the name `example.baz.yml`.

## Empty strings

You can replace a match with an empty string like so:

```
    loader: 'file?name=[name].[ext]!name-replace?find=foo&replace='
```

## Regex example

To use a Regular Expression for the find pattern, pass a flags query parameter. It can be an empty string if you just want the default flag.

```
loader: 'file?name=[name].[ext]!name-replace?find=\.[s|S]chema&replace=.bar&flags='
```

## Contributing

Please follow the coding style settings in the .editorconfig and .jscsrc files. When committing, please follow our commit conventions by using `npm run commit` instead of `git commit`.

## Licence:

[MIT](http://en.wikipedia.org/wiki/MIT_License)
