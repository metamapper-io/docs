---
id: installation--file-storage
title: File Storage
---

Metamapper leverages the [django-storages](https://django-storages.readthedocs.io/en/latest/) library to support storing files in various backends, such as [Amazon S3](https://aws.amazon.com/s3/) or [Google Cloud Storage](https://cloud.google.com/storage).

[django-storages](https://django-storages.readthedocs.io/en/latest/) is an extension of the Django [File storage API](https://docs.djangoproject.com/en/2.2/ref/files/storage/), which means it is possible to roll your own backend (e.g., Azure Blob Storage, etc.) as long as it conforms to the same interface.

All interactions with blob storage in Metamapper go through the [blob.py](https://github.com/metamapper-io/metamapper/blob/master/utils/blob.py) utility package.

## Setting the File Storage Backend

You can set the storage backend using the `METAMAPPER_FILE_STORAGE_BACKEND` environment variable. Just reference the import path plus the class you'd like to use as the storage backend:

```bash
METAMAPPER_FILE_STORAGE_BACKEND='metamapper.contrib.files.MyCustomStorageBackend'
```

## File System Backend

Metamapper uses the `django.core.files.storage.FileSystemStorage` backend by default.

| Environment variable        | Default | Description              |
|-----------------------------|---------|--------------------------|
| `METAMAPPER_MEDIA_ROOT`  | `uploads/` | File path to the directory that will hold uploaded files. |


## Amazon S3 Backend

You can use Amazon S3 through the `storages.backends.s3boto3.S3Boto3Storage` backend.

| Environment variable        | Default | Description              |
|-----------------------------|---------|--------------------------|
| `AWS_ACCESS_KEY_ID`  | None | Your AWS access key, as a string. |
| `AWS_SECRET_ACCESS_KEY`  | None | Your AWS secret access key, as a string. |
| `METAMAPPER_FILE_STORAGE_BUCKET`  | None | The S3 bucket to upload to. |
| `METAMAPPER_FILE_STORAGE_BUCKET_ACL`  | `private` | [Permission grants](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl/lists#predefined-acl) associated with uploaded files. |
| `METAMAPPER_MEDIA_ROOT`  | `uploads/` | File path to the directory that will hold uploaded files. |

> For security reasons, it is recommended that you attach an IAM role to your compute instance(s) rather than use the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
>
> However, these configuration setting remain available for convenience.

You will need a basic IAM policy to grant access to the bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:GetObjectAcl",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:PutObjectAcl",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::example-bucket-name/*",
                "arn:aws:s3:::example-bucket-name"
            ]
        }
    ]
}
```

## Google Cloud Storage Backend

Google Cloud Storage can be used via the `storages.backends.gcloud.GoogleCloudStorage` backend.

| Environment variable        | Default | Description              |
|-----------------------------|---------|--------------------------|
| `METAMAPPER_FILE_STORAGE_BUCKET`  | None | The Google Cloud Storage bucket to upload to. |
| `METAMAPPER_FILE_STORAGE_BUCKET_ACL`  | `private` | [Permission grants](https://cloud.google.com/storage/docs/access-control/lists#predefined-acl) associated with uploaded files. |
| `METAMAPPER_MEDIA_ROOT`  | `uploads/` | File path to the directory that will hold uploaded files. |

Metamapper grabs [authentication credentials](https://cloud.google.com/docs/authentication/getting-started#setting_the_environment_variable) via JSON file path set through the `GOOGLE_APPLICATION_CREDENTIALS` environment variable. This is a standard process supported by Google.
