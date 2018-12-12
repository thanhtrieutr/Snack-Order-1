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

### 6) Input

Like **InputField** without label.

i.e:

```js

  <Input changeText={this.changeCode} className="forget-input" value={this.state.code} type="text" placeholder="* Enter something here" />

```

### 7) Notification

Show guide, warning, info, ...

Class: is-primary, is-info, is-warning, is-success, is-danger.

i.e:

```js

  <Notification className="is-warning" content="something"></Notification>

```
### 8) StatusField

Like **Notification** but using in Main-order.

stat: ms_info, ms_success, ms_warning, ms_error.

i.e: 

```js

  <StatusField stat={this.state.updateStat} content={this.state.message}/>

```

