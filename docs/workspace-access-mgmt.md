---
id: workspace-management--access-mgmt
title: Access Management
description: Learn more about how to manage team permissions in Metamapper.
---

## Membership

User membership in Metamapper is scoped to the workspace. Each user is meant to have a single account that they can connect to multiple workspaces.

## Permissions

Member roles dictate access within an workspace.

#### Owner

- Unrestricted access to the workspace, its data, and settings.
- Can add, modify, and delete SSO connections.
- Can add and remove members from the workspace.
- Can delete a workspace.

#### Member

- Can add, modify, and delete datastores and their objects.
- Can add, modify, and delete comments.

#### Readonly

- Can view datastores and their objects, as well as view most other data within the organization.

## Inviting Team Members

1. Navigate to the **Workspace Settings** page then to **Users**.
2. Enter the user's email address into the form.
3. Select the role to grant the user.
4. Click send to invite the user.

This will send a notification to the provided email indicating that they have been invited to the workspace.

## Changing User Access

You can update a specific team member's access by clicking their current permission level, selecting the desired permission level from the dropdown, and clicking the "Ok" button.

## Groups

Groups are a convenient way to manage collection of users. You can currently use groups to grant datastore-specific permissions to many users at once. We plan to extend the role of groups in Metamapper in the future.

You can create, update, and delete groups from the **Workspace Settings > Groups** page.

![groups](/img/guides/groups.png)

To manage which users belong to a group, click on the count of users located to the right of the group name. This will reveal a window where you can add and remove users from the group.

![group-users](/img/guides/group-users.png)

## Limiting access to a datastore

Metamapper allows you to define granular access controls on each datastore you connect. This gives you more detailed control over what your team can (and cannot) do in Metamapper.

Permissions can be granted to a specific user or group. Categorizing your team into groups makes it easier to bulk assign permissions as needed.

Metamapper honors the highest level of permission that a user has. In other words, if a user is in a group that is more permissive, the user will assume the permissions granted to said group.

> **We never change the permissions of the connect datastore.** These permissions only affect how users interact with metadata cached in Metamapper.

Granular permissions are enabled when a datastore is created. This means when you create a datastore, most users within your workspace will not have access to it. You will have to assign permissions from the **Datastore > Access** page.

If needed, you can disable this permission system for a specific datastore from the **Datastore > Access** page. This would mean that only [workspace-level permissions](workspace-management--access-mgmt#permissions) would apply.

#### Privilege Definitions

> Users with the **Owner** status are exempt from this system and have [superuser](https://en.wikipedia.org/wiki/Superuser) status within the workspace. Additionally, **Readonly** users will only honor the **View Datastore** permission.

##### View Datastore

Users with this permission can view the datastore, but cannot interact with any of its components. This permission is helpful if you need to hide a datastore from certain parts of your organization.

##### Change Datastore Settings

Users with this permission can update datastore settings, such as the [allowed custom properties](metadata-management--custom-fields#hiding-a-custom-field) and the nickname of the datastore.

##### Change Datastore Connection

Users with this permission can update the connection options used during the [schema inspection](metadata-management--schema-inspection) process.

##### Change Datastore Metadata

Users with this permission can update table descriptions, custom properties, and anything related to documenting your datastore.

##### Comment on Datastore

Users with this permission can add, update, and delete comments throughout the datastore. It also means the user can pin comments. We recommend that you give this permission to most (if not all) of the users that have access to this datastore.

##### Change Datastore Access

Users with this permission can add and alter the permission grants described in this section. It also means the user can disable the permission system, so be cautious when giving out this level of access.
