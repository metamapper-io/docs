---
id: installation--configuring-metamapper
title: Configuring Metamapper
---

We understand the need to customize certain aspects of Metamapper for your own purposes. This section covers how to handle overriding the default settings.

## Environment Variables

Many aspects of Metamapper are configured via environment variables. These are read into the [settings](https://github.com/getmetamapper/metamapper/blob/master/metamapper/settings.py) module, which flows through to the rest of the application.

The following is a list of settings and what they control:

| Environment Variable          | Description | Default Value |
|-------------------------------|-------------|---------------|
| `ENVIRONMENT`                 |          | development |
| `METAMAPPER_SECRET_KEY`       | Used for [cryptographic signing](https://docs.djangoproject.com/en/2.2/ref/settings/#secret-key), such as JWT secret. | None |
| `METAMAPPER_FERNET_KEY`       | Used for [encrypting](https://cryptography.io/en/latest/fernet/) sensitive information. Can be a comma-delimited list. | None |
| `METAMAPPER_WEBSERVER_ORIGIN` | Base address of your Metamapper instance. | http://localhost:5000 |
| `METAMAPPER_GRAPHQL_ORIGIN`   |  | http://localhost:5000 |
| `METAMAPPER_DB_NAME`          |  | metamapper |
| `METAMAPPER_DB_USER`          |  | postgres   |
| `METAMAPPER_DB_PASSWORD`      |  | postgres |
| `METAMAPPER_DB_HOST`          |  | database |
| `METAMAPPER_DB_PORT`          |  | 5432 |
| `METAMAPPER_CELERY_BROKER_URL`       | See [Asynchronous Workers](installation--asynchronous-workers) section. | redis://redis:6379/0 |
| `METAMAPPER_CELERY_RESULT_BACKEND`   |    | None |
| `METAMAPPER_EMAIL_BACKEND`           | See [Email Notifications](installation--email-configuration) section. | django.core.mail.backends.console.EmailBackend |
| `METAMAPPER_EMAIL_HOST`              |    | localhost |
| `METAMAPPER_EMAIL_USER`              |    | None |
| `METAMAPPER_EMAIL_PASSWORD`          |    | None |
| `METAMAPPER_EMAIL_PORT`              |    | 25 |
| `METAMAPPER_EMAIL_USE_TLS`           |    | False |
| `METAMAPPER_EMAIL_USE_SSL`           |    | False |
| `METAMAPPER_GITHUB_CLIENT_ID`        |    | None |
| `METAMAPPER_GITHUB_CLIENT_SECRET`    |    | None |
| `METAMAPPER_GOOGLE_CLIENT_ID`        |    | None |
| `METAMAPPER_GOOGLE_CLIENT_SECRET`    |    | None |
| `METAMAPPER_CACHEOPS_REDIS_URL`      |    | None |
| `METAMAPPER_SEARCH_BACKEND`          | See [Search](installation--search) section. | app.omnisearch.backends.postgres_search_backend.PostgresSearchBackend |
| `METAMAPPER_FILE_STORAGE_BACKEND`    | See [File Storage](installation--file-storage) section. | django.core.files.storage.FileSystemStorage |
| `METAMAPPER_FILE_STORAGE_BUCKET_ACL` |    | private |
| `METAMAPPER_MEDIA_ROOT`              |    | uploads/ |
| `AWS_ACCESS_KEY_ID`                  |    | None |
| `AWS_SECRET_ACCESS_KEY`              |    | None |

## Advanced Configuration

If you are using the recommended [bootstrap](https://github.com/getmetamapper/metamapper-setup) for Metamapper, you have granular controls over your configuration via Python modules. We accomplish this by [overwriting the default configuration files](https://github.com/getmetamapper/metamapper-setup/blob/master/Dockerfile#L5) with ones that you provide.

For example, Metamapper defaults to a very simple [gunicorn configuration](https://github.com/getmetamapper/metamapper/blob/master/metamapper/conf/gunicorn.py) to manage web requests. The Docker setup exposes the gunicorn configuration as a Python module, which let's you customize settings such as timeouts, [worker class type](https://docs.gunicorn.org/en/stable/settings.html#worker-class), and much more.

> Configuration overrides are placed in the [conf](https://github.com/getmetamapper/metamapper-setup/tree/master/metamapper/conf) directory.

### Celery

**Environment Variable:** `METAMAPPER_CELERY_CONFIG_MODULE`

**Default:** `metamapper.conf.celery`

The bootstrap provides a [default Celery configuration](https://github.com/getmetamapper/metamapper-setup/blob/master/config_templates/celery.default.py) to get you started. You can manually override this module by setting the `METAMAPPER_CELERY_CONFIG_MODULE` to any importable module.

For example, if the following file (that you created) is accessible via the `PYTHONPATH`:

```python
# metamapper/conf/celery_overrides.py

broker_url = 'amqp://guest:guest@rabbitmq:5672'

broker_connection_timeout = 10.0

accept_content = ['application/json']

result_serializer = 'json'

task_serializer = 'json'

task_default_queue = 'priority'

task_default_rate_limit = '1000/s'
```

You could update your environment with the following variable:

```bash
METAMAPPER_CELERY_CONFIG_MODULE='metamapper.conf.celery_overrides'
```

Celery will now use RabbitMQ as a broker and only consume from the `priority` task queue. This can be especially powerful when you need to scale and customize your workers.

> **IMPORTANT**: Using this setting will completely overwrite your Celery configuration. No default values will be retained.

### Gunicorn

Environment Variable: `METAMAPPER_GUNICORN_CONFIG_PATH`

Default: `./metamapper/conf/gunicorn.py`

You can override the default [gunicorn configuration](https://github.com/getmetamapper/metamapper-setup/blob/master/config_templates/gunicorn.default.py) in a similar way. The only difference is that you just need to provide a path to a Python file. It does not need to be an importable module.

```bash
METAMAPPER_GUNICORN_CONFIG_PATH='/opt/conf/custom_gunicorn.py'
```

You can read more about configuring Gunicorn via [it's documentation](https://docs.gunicorn.org/en/stable/configure.html).

> **IMPORTANT**: Using this setting will completely overwrite your Gunicorn configuration. No default values will be retained.

### Django

**Environment Variable:** `METAMAPPER_SETTINGS_OVERRIDE_MODULE`

**Default:** `None`

Metamapper handles a serious amount of configuration using the [django.conf.settings](https://github.com/getmetamapper/metamapper/blob/master/metamapper/settings.py) module. You can override virtually any setting this file by referencing an importable module using the `METAMAPPER_SETTINGS_OVERRIDE_MODULE` environment variable.

> Unlike the other overrides mentioned above, this strategy will only override settings that you provide.

For example, if the following file (that you created) is accessible via the `PYTHONPATH`:

```python
# metamapper/conf/settings_overrides.py

TIME_ZONE = 'America/Los_Angeles'
```

You could update your environment with the following variable:

```bash
METAMAPPER_SETTINGS_OVERRIDE_MODULE='metamapper.conf.settings_overrides'
```

This would override the default timezone for your Metamapper instance:

```bash
>>> from django.conf import settings
>>> settings.TIME_ZONE
'America/Los_Angeles'
```

Please note that overriding many of the default settings of Metamapper is not advised. Please make sure you know what you are changing before shipping to production, as it could have unintended consequences.
