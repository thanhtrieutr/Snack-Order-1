# Components

## Chứa các component chung được sử dụng lại nhiều lần.

### 1) UserInputField
can pass value, id, className, placeholder, onChangeHandle, name

### 2) PasswordInputField
can pass id, className, placeholder, onChangeHandle, name

### 3) SubmitButton
can pass id, className, onClickHandle, content

### 4.1) LinkAdminPage
can pass activeMenuItem (ex: activeMenuItem="today-order")

### 4.2) NavBarAdmin
can pass activeMenuItem (ex: activeMenuItem="today-order")

don't have check authentication
Ex: see adminHome

### 5) InputField

Pass className, id, label, changeText, value, type.

i.e:

```js

  <InputField className="input is-info" label="Email" changeText={this.changeEmail} value={this.state.email} type="text"/>

```