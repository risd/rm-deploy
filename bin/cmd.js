#!/usr/bin/env node
var fs = require('fs');
var parseArgs = require('minimist');
var Deploy = require('wh-s3-branch-deploy');

var args = parseArgs(process.argv.slice(2));

var defaultConfPath = getUserHome() + '/.risdmedia/aws.json';
var defaultWHConfPath = '.firebase.conf';
var defaultAwsKeyInConf = 'aws';

var opts = {};


if (args.help) {
    printing = true;
    var usage = fs.readFileSync(__dirname + '/usage.md')
                  .toString()
                  .replace(/```/g, '\n');
    console.log(usage);
    return;
}


var confPath;
if (args.conf) {
    confPath = process.cwd() + args.conf;
}
else {
    confPath = defaultConfPath;
}

try {
    opts.aws = JSON.parse(fs.readFileSync(confPath));
} catch (err) {
    var e = [
        'A configuration file is required.',
        'Tried finding one here:',
        '',
        '\t' + confPath,
        '',
        'Explicitly pass in a file: ',
        '',
        '\trm-deploy --conf=aws.json',
        '',
        'Or save one to the default ',
        'location:',
        '',
        '\t~/.risdmedia/aws.json',
        ''
    ];
    console.log(e.join('\n'));
    return;
}

// Ensure you have aws credentials.
if (('key'    in opts.aws) &&
    ('secret' in opts.aws)) {
    // Got'em;
} else {
    var e = [
        'The configuration file referenced does not',
        'contain aws credentials. Your conf file should',
        'be JSON, and have two keys. `key` & `secret`.',
        '`key` is your public aws key, `secret` is',
        'secret key.',
        ''
    ];
    console.log(e.join('\n'));
    return;
}


if (!args.bucket) {
    console.log(
        'Deploying to bucket named based on \n' +
        'the current git branch.\n');
} else {
    opts.bucket = args.bucket;
    console.log('Deploying to bucket named: ' + opts.bucket);
}

if (!args.prefix) {

    try {
        // Try the .firebase.conf file,
        // webhook's default configuration
        // file
        opts.prefix =
            JSON.parse(
                fs.readFileSync(
                    process.cwd() +
                    '/' +
                    defaultWHConfPath
                )
            )
            .siteName;
    }
    catch (err) {
        var e = [
            'A prefix is required. This can inferred',
            'from the WebHook conf file, `.firebase.conf`,',
            'if this is run from the root of the WebHook',
            'project. Otherwise, pass one in explicitly.',
            '',
            '\trm-deploy --prefix=myPrefix',
            '',
            ''
        ];
        console.log(e.join('\n'));
        return;
    }
} else {
    opts.prefix = args.prefix;
}


Deploy(opts);


function getUserHome() {
  return process.env[
            (process.platform == 'win32') ?
            'USERPROFILE' : 'HOME'
        ];
}