---
id: datastores--hive-metastore
title: Hive Metastore
description: Connect and document Apache Hive in minutes using Metamapper. This page contains a setup aond troubleshooting guide for Hive Metastore connections.
---

Metamapper supports [Apache Hive](https://hive.apache.org/) as a connection source. Hive is distributed data warehouse software facilitates reading, writing, and managing large datasets residing in distributed storage using SQL.

Metamapper can sync Hive if it has an [external metastore](https://cwiki.apache.org/confluence/display/Hive/AdminManual+Metastore+Administration) configured.

This guide details how to setup and troubleshoot Hive in Metamapper.

## Prequisites

* **A running Hive metastore.** Metamapper has been tested with Hive 2.0 and later when it is configured to use a remote metastore on either a MySQL, PostgreSQL, or Microsoft SQL Server database.

* **Ability to view database connection details**. Metamapper specifically needs the following information:
    - IP or host
    - Username
    - Password
    - Port
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

You will need to provide a user that Metamapper will use to periodically scan your external Hive metastore. We recommend creating a new user so that you can easily isolate Metamapper from the rest of your infrastructure.

#### MySQL

```sql
CREATE USER metamapper IDENTIFIED BY '<redacted>';
```

#### PostgreSQL

```sql
CREATE USER metamapper WITH PASSWORD '<redacted>';
```

#### SQL Server

```sql
CREATE LOGIN metamapper WITH PASSWORD = '<redacted>';
CREATE USER metamapper FOR LOGIN metamapper;
```

## Grant read access to user

Metamapper needs permission to read the [metastore tables](https://github.com/apache/hive/tree/master/metastore/scripts/upgrade) that are created when Hive is installed. We assume that certain standard installation processes were followed when setting up your Hive cluster.

#### MySQL

For MySQL connections, we assume that the metastore was created on the same database that was included in the connection settings.

```sql
GRANT SELECT, PROCESS ON <database>.* TO 'metamapper';
FLUSH PRIVILEGES;
```

#### PostgreSQL

For PostgreSQL connections, we assume that the metastore was created on the `public` schema. Hive forces Postgres to use uppercase tables by [using quotes](https://github.com/apache/hive/blob/master/metastore/scripts/upgrade/postgres/hive-schema-2.3.0.postgres.sql#L22) in it's DDL statements.

If for some reason, your installation does not meet the above requirements, please [file a Github issue](https://github.com/getmetamapper/metamapper/issues/new/choose) and we will assist as soon as possible.

```sql
GRANT USAGE ON SCHEMA "<schema>" TO USER metamapper;
GRANT SELECT ON ALL TABLES IN SCHEMA "<schema>" TO USER metamapper;
```

#### SQL Server

For Microsoft SQL Server connections, we assume that the metastore was created on the same database that was included in the connection settings.

```sql
GRANT SELECT ON SCHEMA :: [public] TO metamapper
```

## Questions?

Metamapper is an [opensource project](https://github.com/getmetamapper/metamapper). If you have a question that isn't answered here, check out the [discussion forum](http://discuss.metamapper.io).

You can also help improve this documentation by making [a pull request](https://github.com/getmetamapper/documentation/pulls).
