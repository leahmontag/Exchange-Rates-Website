import { React, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel } from '@mui/material';



const ExchangeTable = (props) => {
    
    const { currencies, baseCurrency, exchangeRates } = props;
    const [sortBy, setSortBy] = useState(null);

    const handleSort = (column) => {
        setSortBy(column)
    }

    const sortedCurrencies = currencies.filter(currency => currency !== baseCurrency)
    .sort((a, b) => {
       if (sortBy === 'Exchange Rates') {
            const rateA = exchangeRates[a];
            const rateB = exchangeRates[b];
            return rateA - rateB;
        }
        return a.localeCompare(b);
    });


    return (
        <div className="Table">
        <TableContainer>
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell key="Base" >
                            <TableSortLabel onClick={()=> handleSort('Base')}>
                                Base
                            </TableSortLabel>  
                        </TableCell>
                        <TableCell key="Target" >
                            <TableSortLabel onClick={()=> handleSort('Target')}>
                                Target
                            </TableSortLabel>                            
                        </TableCell>
                        <TableCell key="Exchange Rates" >
                            <TableSortLabel onClick={()=> handleSort('Exchange Rates')}>
                                Exchange Rates
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {sortedCurrencies.map((targetCurrency) => (
                <TableRow key={targetCurrency}>
                    <TableCell>{baseCurrency}</TableCell>
                    <TableCell>{targetCurrency}</TableCell>
                    <TableCell>{exchangeRates && exchangeRates[targetCurrency]}</TableCell>
                </TableRow>
                ))}  
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default ExchangeTable;






