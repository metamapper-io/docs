---
id: installation--extending-metamapper
title: Extensions
---

## What for?

Extensions are an advanced concept in Metamapper. Using extensions can be a way for you to customize Metamapper to fit your needs.

Exension can be used as an easy way to adapt Metamapper to different technology stacks. We intend to support this pattern as we add new features and datastores to our catalog.

### The `contrib` module

The [Docker bootstrap](https://github.com/getmetamapper/metamapper-setup) syncs Metamapper with a local directory at `./metamapper/contrib`. Python code placed in this directory will be accessible to Metamapper:

```
metamapper/
    conf/
    contrib/
        __init__.py
        backends/
            __init__.py
            custom_file_storage.py
            custom_search_backend.py
    requirements.txt
```

We currently expose the following backends as configurable:

| Environment Variable | Description |
| -------------------- | ----------- |
| `METAMAPPER_EMAIL_BACKEND` | Handles email notification deliveries. |
| `METAMAPPER_FILE_STORAGE_BACKEND` | Handles file uploads to different cloud providers. |
| `METAMAPPER_SEARCH_BACKEND` | Handles searching data assets (such as tables) and their annotations. |

> We have plans to support inspectors as extensions so that you can easily roll out datastores that we do not support by default, such as BigQuery or Vertica. However, this feature is not yet available.

## Example

See [Rolling Your Own Search Backend](installation--search#rolling-your-own-search-backend) for a brief example on adding an extension.

## Installing Extra Dependencies

When you build the bootstrap, it will install any dependencies found in the [requirements.txt](https://github.com/getmetamapper/metamapper-setup/blob/57dc904a28a0cf464b6ac7594f229b6ea4db6a49/Dockerfile#L8) found in the `metamapper` directory of the bootstrap.

You can also update the [Dockerfile](https://github.com/getmetamapper/metamapper-setup/blob/master/Dockerfile) to install any Linux dependencies, etc.
