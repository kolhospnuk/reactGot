
import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({form, leftRow, rightRow}) => {
    return (
        <Row>
            <Col md='6'>
                {form}
                {leftRow}
            </Col>
            <Col md='6' className='details'>
                {rightRow}
            </Col>
        </Row>
    )
}

export default RowBlock;
