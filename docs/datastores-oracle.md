---
id: datastores--oracle
title: Oracle
description: Connect and document Oracle in minutes using Metamapper. This page contains a setup aond troubleshooting guide for Oracle connections.
---

Metamapper provides limited support for [Oracle](https://www.oracle.com/database/) as a connection source. Oracle Database is a multi-model database management system produced and marketed by Oracle Corporation.

This guide details how to setup and troubleshoot Oracle in Metamapper.

## Prerequisites

* **A running Oracle 12c instance.** Instructions for creating a Oracle database are outside the scope of this guide; it assume that you have an instance up and running. For help getting spinning up your own Oracle instance, please refer to your cloud provider's documentation.

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

You will need to provide a user that Metamapper will use to periodically scan your database. We recommend creating a new user so that you can easily isolate Metamapper from the rest of your infrastructure.

```sql
CREATE USER metamapper IDENTIFIED BY <redacted>;
```

## Grant read access to user

Metamapper needs read access to the tables it wishes to sync. Metamapper will only read metadata _about_ your tables. It will never read the contents of your tables.

You can grant access by running the following statement:

```
GRANT ALL PRIVILEGES TO metamapper;
GRANT SELECT ANY DICTIONARY to metamapper;
```

You can then revoke permissions to specific objects that you do not wish to sync into Metamapper.

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
