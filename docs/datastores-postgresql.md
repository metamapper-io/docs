---
id: datastores--postgresql
title: PostgreSQL
description: Connect and document PostgreSQL in minutes using Metamapper. This page contains a setup aond troubleshooting guide for PostgreSQL connections.
---

Metamapper supports [Postgres](https://www.postgresql.org/) as a connection source. Postgres is a powerful, open source object-relational database system that supports complex data types.

This guide details how to setup and troubleshoot Postgres in Metamapper.

## Prerequisites

* **A running PostgreSQL (version 9.6 or greater) instance.** Instructions for creating a PostgreSQL database are outside the scope of this guide; it assume that you have an instance up and running. For help getting spinning up your own PostgreSQL instance, please refer to your cloud provider's documentation.

* **Ability to view database connection details**. Metamapper specifically needs the following information:
    - IP or host
    - Username
    - Password
    - Port (default: 5432)
    - Database

* **Database privileges that allow you to create users and grant privileges.** This is required to create a database user for Metamapper.

## Choose connection method

There are two ways to connect your database.

### Direct Connection

A direct connection will work if Metamapper is in the same private network as your database. A direction connection will also work if your database is publicly accessible.

### SSH Tunnel

A jump host or SSH tunnel is required if your database is in a separate private network. This method uses a publicly accessible server to act as an intermediary between Metamapper and your database.

Check out [this guide](metadata-management--ssh-tunnels) on setting up a SSH tunnel to work with Metamapper.

## Create user

You will need to provide a user that Metamapper will use to periodically scan your database. We recommend creating a new user so that you can easily isolate Metamapper from the rest of your infrastructure.

```sql
CREATE USER metamapper WITH PASSWORD '<redacted>';
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

Postgres only allows you to grant permissions on a per-schema basis. It also requires that the authenticated user has access to the schema in order for metadata about said schema to be surfaced via the system tables.

You will need to run the following command **for every schema** you which to grant Metamapper access to for indexing purposes.

```sql
GRANT USAGE ON SCHEMA "<schema>" TO GROUP metamapper;
GRANT SELECT ON ALL TABLES IN SCHEMA "<schema>" TO GROUP metamapper;
```

You will need to run this command to grant `SELECT` on tables created in the future:

```sql
ALTER DEFAULT PRIVILEGES GRANT SELECT ON TABLES TO metamapper;
```

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
