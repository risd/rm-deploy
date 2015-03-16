```
rm-deplpoy
    --aws    = path/to/aws.json
    --prefix = 'BucketPrefix'
    --bucket = 'BucketName'
    --help

`aws`    Default is `~/.risdmedia/aws.json`.
         Expects two keys: `key` & `secret`.
         Required.

`prefix` Default is the `siteName` key in
         WebHook's per project configuration
         file, `.firebase.conf`. Looks for this
         relative to Required.

`bucket` Default is the current git branch. Optional.
```