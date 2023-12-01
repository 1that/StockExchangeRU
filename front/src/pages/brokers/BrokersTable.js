import React from 'react';
import './style/BrokersTable.css';
import * as material from '@mui/material';
import * as icon from '@mui/icons-material';

const rows = [
    {firstName: 'Adam', lastName: 'Smith', balance: '1000'},
    {firstName: 'Mellony', lastName: 'Adams', balance: '700'},
    {firstName: 'James', lastName: 'Mellon', balance: '1010'}
];

function BrokersTable() {
    return (
        <material.TableContainer component={material.Paper}  
        sx={{ minWidth: 400, width: 650, backgroundColor: '#5a5a5a' }}>
            <material.Table aria-label='simple table'>
                <material.TableHead>
                    <material.TableRow>
                        <material.TableCell id='FirstName' sx={{ color: 'white'}}>Имя</material.TableCell>
                        <material.TableCell id='LastName' sx={{ color: 'white'}}>Фамилия</material.TableCell>
                        <material.TableCell id='Balance' align='center' sx={{ color: 'white'}}>Баланс</material.TableCell>
                        <material.TableCell align='center'></material.TableCell>
                    </material.TableRow>
                </material.TableHead>
                <material.TableBody>
                    {rows.map(row => 
                        <material.TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <material.TableCell id='FirstName' sx={{ color: 'white'}} component='th' scope='row'>{row.firstName}</material.TableCell>
                            <material.TableCell id='LastName' sx={{ color: 'white'}} component='th' scope='row'>{row.lastName}</material.TableCell>
                            <material.TableCell id='Balance' sx={{ color: 'white'}} align='center'>{row.balance}</material.TableCell>
                            <material.TableCell align='left'>
                                <material.IconButton aria-label='save'><icon.Save id='Save' /></material.IconButton>
                                <material.IconButton aria-label='delete'><icon.Delete id='Delete'/></material.IconButton>
                            </material.TableCell>
                        </material.TableRow>
                    )}
                </material.TableBody>
            </material.Table>
        </material.TableContainer>
    );
}

export default BrokersTable;