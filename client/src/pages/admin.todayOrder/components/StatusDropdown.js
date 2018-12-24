import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import {Dropdown, MenuItem, ButtonToolbar} from 'react-bootstrap'
const enhance = compose(
    withHandlers({
        setState: props => () => {
            if (props.status === 'pending') return "default";
            if (props.status === 'accept') return 'success';
            if (props.status === 'reject') return 'danger';
        }
    })
);
const StatusDropdown = (props) => {
    var {status, statusHandle, no, setState} = props;
    return (
        <ButtonToolbar>
        <Dropdown onSelect={statusHandle} id={"dropdown-custom-menu" + no} key={no}>
            <Dropdown.Toggle bsStyle={setState()}>
                {status}
            </Dropdown.Toggle>
            <Dropdown.Menu className="admin-today-order-dropdown-menu">
                <MenuItem eventKey={no+'1'}>pending</MenuItem>
                <MenuItem eventKey={no+'2'}>accept</MenuItem>
                <MenuItem eventKey={no+'3'}>reject</MenuItem>
            </Dropdown.Menu>
        </Dropdown>
        </ButtonToolbar>
    );
}

export default enhance(StatusDropdown);