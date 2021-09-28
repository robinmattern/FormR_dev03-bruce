   import   React                              from 'react'

   import { List,      Datagrid,  EditButton } from 'react-admin'

// import { TextField, DateField, EmailField } from 'react-admin'
   import { TextField, DateField             } from 'react-admin'   // .(10314.13.1 RAM Maybe later)

   import { Edit, Create, SimpleForm         } from 'react-admin'
// import { TextInput, DateInput, EmailInput } from 'react-admin'
   import { TextInput, DateInput             } from 'react-admin'


export const RoleList = props => (

    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton/>
        </Datagrid>
    </List>
    );

export const RoleEdit = props => {
  return (
    <Edit title='Edit Role' {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name"    />
        <DateInput source="createdAt"   />
        <DateInput source="updatedAt"   />

      </SimpleForm>
    </Edit>
  )
}

export const RoleCreate = props => {
  return (
    <Create title='Create a Role' {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name"    />
        <DateInput source="createdAt"   />
        <DateInput source="updatedAt"   />
      </SimpleForm>
    </Create>
  )
}