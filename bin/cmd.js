#!/usr/bin/env node
var fs = require('fs');
var parseArgs = require('minimist');
var Deploy = require('wh-s3-branch-deploy');

var args = parseArgs(process.argv.slice(2));

var defaultConfPath = '.risdmedia.conf';
var defaultWHConfPath = '.firebase.conf';
var defaultAwsKeyInConf = 'aws';
var template = fs.readFileSync(
                        __dirname +
                        '/template-risdmedia.json')
                .toString();

var printing = false;
if (args.template) {
    printing = true;
    var m = [
        '',
        'Configuration template:',
        '',
        '\t' + template.replace(/\n/g, '\n\t'),
        ''
    ];
    console.log(m.join('\n'));
}

if (args.help) {
    printing = true;
    var usage = fs.readFileSync(__dirname + '/usage.md')
                  .toString()
                  .replace(/```/g, '\n');
    console.log(usage);
}

if (printing) {
    return;
}

var confPath;
if (args.conf) {
    confPath = args.conf;
}
else {
    confPath = defaultConfPath;
}

try {
    args.conf = JSON.parse(
                    fs.readFileSync(process.cwd() +
                        '/' +
                        confPath)
                    );
} catch (err) {
    var e = [
        'A configuration file is required.',
        'Tried finding one named `.risdmedia.conf`',
        'at the path where this was executed.',
        'Either make that file, or explicitly define',
        'a relative path.',
        'This file must be valid JSON.',
        '',
        '\trm deploy --conf=file.json',
        ''
    ];
    console.log(e.join('\n'));
    return;
}


if ('awsKeyInConf' in args) {
    args.aws = args.conf[args.awsKeyInConf];
} else {
    // Try the looking at the `aws` key by default
    // if one is not defined
    args.aws = args.conf[defaultAwsKeyInConf];
}

// Ensure you have aws credentials.
if (('key'    in args.aws) &&
    ('secret' in args.aws)) {
    // Got'em;
} else {
    var e = [
        'The configuration file referenced does not',
        'contain aws credentials. Your conf file should',
        'follow this template:',
        '',
        '\t' + template.replace(/\n/g, '\n\t'),
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
    console.log('Deploying to bucket named: ' + args.bucket);
}

if (!args.prefix) {

    try {
        // Try the .firebase.conf file,
        // webhook's default configuration
        // file
        args.prefix =
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
            'A prefix is required. This can be set',
            'in the configuration file using the key',
            '`prefix`.',
            '',
            '\t' + template.replace(/\n/g, '\n\t'),
            '',
            'Or can be passed into this',
            'command',
            '',
            '\trm deploy --prefix=myPrefix',
            '',
            ''
        ];
        console.log(e.join('\n'));
        return;
    }
}


Deploy(args);