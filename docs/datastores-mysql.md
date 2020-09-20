---
id: datastores--mysql
title: MySQL
description: Connect and document MySQL in minutes using Metamapper. This page contains a setup aond troubleshooting guide for MySQL connections.
---

Metamapper supports [MySQL](https://www.mysql.com/) as a connection source. MySQL is a row-based database primarily used for transactional use cases, such as web applications.

This guide details how to setup and troubleshoot MySQL in Metamapper.

## Prerequisites

* **A running MySQL (version 5.6 or greater) instance.** Instructions for creating a MySQL database are outside the scope of this guide; it assume that you have an instance up and running. For help getting spinning up your own MySQL instance, please refer to your cloud provider's documentation.

* **Ability to view database connection details**. Metamapper specifically needs the following information:
    - IP or host
    - Username
    - Password
    - Port (default: 3306)
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

You will need to provide a user that Metamapper will use to periodically scan your MySQL instance. We recommend creating a new user so that you can easily isolate Metamapper from the rest of your infrastructure.

```sql
CREATE USER metamapper IDENTIFIED BY '<redacted>';
```

## Grant read access to user

> In MySQL, a schema is synonymous with a database. Metamapper will sync all schemas that it has read access to.

MySQL manages permissions using simple `GRANT` and `REVOKE` statements. You can allow Metamapper to read every schema in your database using the statement below. Note that the Metamapper user does need the `PROCESS` privilege to access the required system tables.

```
GRANT SELECT, PROCESS ON *.* TO 'metamapper';
```

If you want to then block access to certain schemas, you could run the following statements **for every schema** that you which to block access to:

```
REVOKE SELECT ON '<schema>'.* FROM 'metamapper';
```

You can then run the following command to will reload the grant tables in the MySQL database. This enables the changes to take effect without reloading or restarting MySQL service.

```sql
FLUSH PRIVILEGES;
```

## Questions?

Metamapper is an [opensource project](https://github.com/getmetamapper/metamapper). If you have a question that isn't answered here, check out the [discussion forum](http://discuss.metamapper.io).

You can also help improve this documentation by making [a pull request](https://github.com/getmetamapper/documentation/pulls).
