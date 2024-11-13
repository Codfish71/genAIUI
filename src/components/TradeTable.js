import React from 'react';
import { Table } from 'react-bootstrap';

const TradeTable = ( {data} ) => {
    
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>TradeId</th>
                    <th>SourceTradeSystem</th>
                    <th>TradeManagerStatusId</th>
                    <th>InstrumentClassId</th>
                    <th>OrderId</th>
                    <th>IsCancelled</th>
                    <th>IsCollateral</th>
                </tr>
            </thead>
            <tbody>
                {data.map((trade, index) => (
                    <tr key={index}>
                        <td>{trade.TradeId}</td>
                        <td>{trade.SourceTradeSystem}</td>
                        <td>{trade.TradeManagerStatusId}</td>
                        <td>{trade.InstrumentClassId}</td>
                        <td>{trade.OrderId}</td>
                        <td>{trade.IsCancelled ? 'Yes' : 'No'}</td>
                        <td>{trade.IsCollateral ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TradeTable;