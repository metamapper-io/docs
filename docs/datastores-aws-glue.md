---
id: datastores--aws-glue
title: AWS Athena
description: TBD
---

Metamapper supports [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/populate-data-catalog.html) as a connection source. The AWS Glue Data Catalog contains references to data that is used as sources and targets of your extract, transform, and load (ETL) jobs in AWS Glue. It can also be used as an external metastore for [Apache Hive](https://hive.apache.org/).

This guide details how to setup and troubleshoot Glue Data Catalog in Metamapper.

## Prequisites

* **An Amazon Web Services (AWS) account**. Sign up for an account at [the AWS website](https://aws.amazon.com).

* **Permissions to create an IAM role .** Metamapper needs to be granted certain permissions to access and query Glue Data Catalog.

## Create a IAM role

You need to create an IAM role to manage permissions between Metamapper and your Glue Data Catalog.

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
                "glue:GetTables",
                "glue:GetDatabases"
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
