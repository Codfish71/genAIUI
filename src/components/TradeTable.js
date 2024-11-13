import React from 'react';
import { Table } from 'react-bootstrap';
import "./table.css"

const TradeTable = ({ data }) => {
    console.log(data)
    const tableHeaders = Object.keys(data[0])
    return (
        <div className="mt-4 table-container">
            <Table striped bordered hover>
                {/* <thead>
                <tr>
                    <th>TradeId</th>
                    <th>SourceTradeSystem</th>
                    <th>TradeManagerStatusId</th>
                    <th>InstrumentClassId</th>
                    <th>IsCancelled</th>
                    <th>OrderId</th>
                    <th>IsCollateral</th>
                    <th>IsAmend</th>
                    <th>IsFOAmend</th>
                    <th>IsTest</th>
                    <th>TimeReceivedUTC</th>
                    <th>ExecutionTimeUTC</th>
                    <th>TradeDate</th>
                    <th>RowVersion</th>
                    <th>TransactionType</th>
                    <th>Account</th>
                    <th>Book</th>
                    <th>BuySellInd</th>
                    <th>Fund</th>
                    <th>FundName</th>
                    <th>ISIN</th>
                    <th>GrossAmount</th>
                    <th>Market</th>
                    <th>Quantity</th>
                    <th>Security</th>
                    <th>Trader</th>
                    <th>SourceInstrumentId</th>
                    <th>TradeManagerDesk</th>
                    <th>SettlementDate</th>
                    <th>TradeCurrency</th>
                    <th>TradeType</th>
                    <th>PriceExecuted</th>
                    <th>NetAmount</th>
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
            </tbody> */}
                <thead> <tr> {tableHeaders.map((key) => (<th key={key}>{key}</th>))} </tr> </thead> <tbody> {data.map((item, rowIndex) => (<tr key={rowIndex}> {tableHeaders.map((key) => (<td key={key}>{String(item[key])}</td>))} </tr>))} </tbody>
            </Table>
        </div>
    );
};

export default TradeTable;