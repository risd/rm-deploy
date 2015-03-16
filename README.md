# RISD Media Deploy

Command line interface to `wh-s3-branch-deploy` with configuration defaults for the Media Group.

### Install

`npm install risd/rm-demploy`

Or globally.

`npm install risd/rm-deploy -g`.

### Usage

With defaults:

`rm-deploy`

Explicitly define options:

`rm-deploy --aws=~/path/to/aws.json --prefix=MyProject`

View help:

`rm-deploy --help`

See [`usage.md`](bin/usage.md) for more.