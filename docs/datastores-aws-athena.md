---
id: datastores--aws-athena
title: AWS Athena
description: Connect and document Amazon Athena in minutes using Metamapper. This page contains a setup aond troubleshooting guide for Amazon Athena connections.
---

Metamapper supports [Amazon Athena](https://aws.amazon.com/athena/) as a connection source. Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL.

This guide details how to setup and troubleshoot Athena in Metamapper.

## Prequisites

* **An Amazon Web Services (AWS) account**. Sign up for an account at [the AWS website](https://aws.amazon.com).

* **Permissions to create an IAM role .** Metamapper needs to be granted certain permissions to access and query Athena metadata.

## Create a IAM role

You need to create an IAM role to manage permissions between Metamapper and your Athena instance.

We do not support IAM users as a connection method. That being said, if you set the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_DEFAULT_REGION` environment variables, your compute instance should be able to assume the provided IAM role.

### Permissions

Create and attach the following inline policy to your IAM role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Action": [
                "athena:ListTableMetadata",
                "athena:ListDatabases",
                "athena:ListDataCatalogs",
                "athena:GetTableMetadata",
                "athena:GetDatabase",
                "athena:GetDataCatalog"
            ],
            "Resource": "*"
        }
    ]
}
```

### Trust relationships

If you are running Metamapper within the same AWS account on an EC2 instance, you should set the trust relationship to:

```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
