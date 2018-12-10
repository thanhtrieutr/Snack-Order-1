// import React from 'react';
// import {Menu} from 'react-bulma-components/full';

// var menuList=[
//     {id:"home", href:"/admin", content:"Home page"},
//     {id:"today-order", href:"/admin/today-order", content:"Today Order"},
//     {id:"order-history", href:"/admin/history", content:"Order history"},
//     {id:"users", href:"/admin/users", content:"Users"},
//     {id:"products", href:"/admin/products", content:"Product list"},
//     {id:"add-product", href:"/admin/product/add", content:"Add new product"},
//     {id:"add-user", href:"/admin/user/add", content:"Create new user"}
// ];

// class LinkAdminPage extends React.Component {
//     render() {
//         return (
//             <Menu>
//                 <Menu.List>
//                     {this.createMenuList(this.props.activeMenuItem)}
//                 </Menu.List>
//             </Menu>
//         );
//     }
//     createMenuList(activeId) {
//         var listItems = menuList.map(item => {
//             if (item.id === activeId) {
//                 return (
//                     <p id={item.id}  key={item.id} style={{padding:0}}>
//                         <Menu.List.Item active href={item.href}> 
//                             {item.content}
//                         </Menu.List.Item>
//                     </p>
//                 );
//             }
//             return (
//                 <p id={item.id}  key={item.id} style={{padding:0}}>
//                     <Menu.List.Item href={item.href}> 
//                         {item.content}
//                     </Menu.List.Item>
//                 </p> 
//             );
//         });
//         return listItems;
//     }
// }

// export default LinkAdminPage;