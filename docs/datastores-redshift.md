---
id: datastores--redshift
title: Redshift
description: Connect and document Redshift in minutes using Metamapper. This page contains a setup aond troubleshooting guide for Redshift connections.
---

Metamapper supports Amazon [Redshift](https://aws.amazon.com/redshift/) data warehouse as a connection source. Redshift is a cloud data warehouse commonly used for business intelligence and operational analytics.

This guide details how to setup and troubleshoot Redshift in Metamapper.

## Prerequisites

* **A running Amazon Redshift instance.** Instructions for creating a Amazon Redshift warehouse are outside the scope of this guide; it assume that you have an instance up and running. For help getting started with Amazon Redshift, refer to [Amazon's documentation](https://aws.amazon.com/redshift/getting-started/).

* **Ability to view database connection details**. Metamapper specifically needs the following information:
    - Cluster hostname
    - Username
    - Password
    - Port (default: 5439)
    - Database

* **Superuser privileges, or privileges that allow you to create users and grant privileges.** This is required to create a database user for Metamapper.

## Choose connection method

There are two ways to connect your database.

### Direct Connection

A direct connection will work if Metamapper is in the same private network as your database. A direction connection will also work if your database is publicly accessible.

### SSH Tunnel

A jump host or SSH tunnel is required if your database is in a separate private network. This method uses a publicly accessible server to act as an intermediary between Metamapper and your database.

Check out [this guide](metadata-management--ssh-tunnels) on setting up a SSH tunnel to work with Metamapper.

## Create user

You will need to provide a user that Metamapper will use to periodically scan your data warehouse. We recommend creating a new user so that you can easily isolate Metamapper from the rest of your infrastructure.

```sql
CREATE USER metamapper PASSWORD = '<redacted>';
```

## Grant read access to user

Redshift can manage what data users can access via permission grants scoped to either the user or a group of users. We recommend using the latter since it will be easier to rotate your users as needed.

```sql
CREATE ROLE metamapper;
```

You will need to add the `metamapper` user to the newly created group so that the schema inspector can assume it at runtime.

```sql
ALTER GROUP metamapper ADD USER metamapper;
```

**Redshift only allows you to grant permissions on a per-schema basis.** It requires that the authenticated user has access to the schema in order for metadata about said schema to be surfaced via the system tables.

As such, you will need to run the following command **for every schema** you which to grant Metamapper access to for indexing purposes.

```sql
GRANT USAGE ON SCHEMA "<schema>" TO GROUP metamapper;
GRANT SELECT ON ALL TABLES IN SCHEMA "<schema>" TO GROUP metamapper;
```

You also will need to run this command to grant `SELECT` on tables created in the future:

```sql
ALTER DEFAULT PRIVILEGES GRANT SELECT ON TABLES TO metamapper;
```

**If you restrict access to system tables**, you will also need to grant the `metamapper` user access. These tables are periodically queried to maintain the Metamapper data catalog.

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO metamapper;

GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO metamapper;
```

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
