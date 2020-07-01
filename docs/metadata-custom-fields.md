---
id: metadata-management--custom-fields
title: Custom Fields
---

Metamapper comes with a highly customizable approach to managing your metadata. Every organization manages their data differently, which is why we provided the **Custom Field** feature.

With a custom field, you will have the ability to document specific information about your data. You will also be able to organize and filter based on these fields in Metamapper.

Some example use cases:

- Recording the person most knowledgeable about a data asset
- Recording a data privacy classification
- Reference to the ETL that populated the table
- Reference to how often a table is updated

## Creating a custom field

You can add a custom field by going to **Workspace Settings > Custom Fields** and clicking on **Add custom field**. The field can be scoped to either [datastores](metadata-management--schema-inspection#datastores) or [tables](metadata-management--schema-inspection#tables).

There are three types of custom fields:

- **Text** - Just a basic free-text field. We will automatically urlify any hyperlinks.
- **Enum** - This is a single choice field where you pre-define the selectable options.
- **User** - Any user in your workspace. If the user is removed from the workspace, we null this field.

![custom-field-create](/img/guides/custom-field-create.png)

## Viewing a custom field

Once the custom field has been created, you can view or edit field values in the following places within Metamapper. To edit the values, click the **Edit** icon in the top right corner of the **Properties** card.

In the **Datastore Overview**:

![custom-field-datastore](/img/guides/custom-field-datastore.png)

In the **Table Overview**:

![custom-field-table](/img/guides/custom-field-table.png)

## Hiding a custom field

Custom fields are scoped to the workspace, which means they are available on every datastore by default.

Metamapper allows you to exclude specific custom fields as a datastore setting. You can do this by navigating to the Datastore Settings page, unchecking the custom fields you want to hide on that specific datastore, and click **Save Changes**.

![custom-field-hidden](/img/guides/custom-field-hidden.png)

## Updating a custom field

You can update certain aspects of a custom field by going to **Workspace Settings > Custom Fields** and clicking the **Edit** button next to the corresponding custom field.

Custom field attributes that cannot be edited, such as the field type, will be disabled.

## Removing a custom field

You can add a custom field by going to **Workspace Settings > Custom Fields** and clicking the **Delete** button next to the corresponding custom field.

> Deleting your custom field will delete the field and all of it's existing data from your Metamapper workspace.

![custom-field-delete](/img/guides/custom-field-delete.png)
