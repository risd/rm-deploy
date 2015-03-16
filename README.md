# RISD Media Deploy

Command line interface to [`wh-s3-branch-deploy`](https://github.com/risd/wh-s3-branch-deploy) with configuration defaults for the Media Group.

### Install

`npm install rm-deploy`

### Usage

Always run from the root of a WebHook project.

`rm-deploy`

Explicitly define options:

`rm-deploy --aws=path/to/aws.json --prefix=MyProject`

View help:

`rm-deploy --help`

See [`usage.md`](bin/usage.md) for more.