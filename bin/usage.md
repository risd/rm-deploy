```
rm-deplpoy
    --aws    = path/to/aws.json
    --prefix = 'BucketPrefix'
    --bucket = 'BucketName'
    --help

`aws`    Path to JSON file with AWS credentials.
		 Default is `~/.risdmedia/aws.json`.
         Expects two keys: `key` & `secret`.
         Required.

`prefix` Prefix to use on the S3 URL.
		 Default is the `siteName` key in
         WebHook's per project configuration
         file, `.firebase.conf`. Expects this
         file to be at the same path that the
         command is executed.
         Required.

`bucket` The name of the bucket used to store &
		 serve your website.
		 Default is the current git branch.
		 Optional.


If deploying to S3, the URL will look like:
http://<prefix>-<bucket>.s3.amazonaws.com
```