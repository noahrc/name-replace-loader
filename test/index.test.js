var path = require('path');
var fs = require('fs');
var rmRf = require('rimraf');
var expect = require('chai').expect;
var webpack = require('webpack');

var entryFilePath = path.join(__dirname, 'source/entry.js');
var outputDirPath = path.join(__dirname, 'build');
var outputFileName = 'build.js';

describe('Webpack name replace loader ...', function () {

  beforeEach(function (done) {
    rmRf(outputDirPath, done);
  });

  it('should replace a string with a different string', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
            {
              test: /\.yml$/,
              loader: 'file?name=[name].[ext]!__this?find=schema&replace=baz'
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);
        var expectedFilePath = path.join(outputDirPath, 'example.baz.yml');
        fs.readFile(expectedFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          done();
        });
      }
    );
  });

  it('should replace a string with an empty string', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
            {
              test: /\.yml$/,
              loader: 'file?name=[name].[ext]!__this?find=.schema&replace='
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);
        var expectedFilePath = path.join(outputDirPath, 'example.yml');
        fs.readFile(expectedFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          done();
        });
      }
    );
  });

  it('should replace a regex with a string', function (done) {
    webpack(
      {
        entry: entryFilePath,
        output: {
          path: outputDirPath,
          filename: outputFileName
        },
        module: {
          loaders: [
            {
              test: /\.yml$/,
              loader: 'file?name=[name].[ext]!__this?find=\.[s|S]chema&replace=.bar&flags='
            }
          ]
        }
      },
      function (error, stats) {
        expect(error).to.equal(null);
        var expectedFilePath = path.join(outputDirPath, 'example.bar.yml');
        fs.readFile(expectedFilePath, 'utf8', function (error, contents) {
          expect(error).to.equal(null);
          done();
        });
      }
    );
  });
});
