import React from 'react'
import {compose,  withHandlers} from 'recompose'
import {Dropdown, MenuItem, ButtonToolbar} from 'react-bootstrap'

const enhance = compose(
    withHandlers({
        setState: props => () => {
            if (props.perPage === '12') return '12';
            if (props.perPage === '24') return '24';
            if (props.perPage === '48') return '48';
        }
    })
);
const PerPage = (props) => {
    var {perPage, statusHandle, no, setState} = props;
    return (
        <ButtonToolbar>
        <Dropdown onSelect={statusHandle} id={"dropdown-custom-menu" + no} key={no}>
            <Dropdown.Toggle bsStyle={setState()}>
                {perPage}
            </Dropdown.Toggle>
            <Dropdown.Menu className="admin-today-order-dropdown-menu">
                <MenuItem eventKey={no+'1'}>12</MenuItem>
                <MenuItem eventKey={no+'2'}>24</MenuItem>
                <MenuItem eventKey={no+'3'}>48</MenuItem>
            </Dropdown.Menu>
        </Dropdown>
        </ButtonToolbar>
    );
}

export default enhance(PerPage);