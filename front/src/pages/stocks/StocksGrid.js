import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as material from '@mui/material';
import * as icon from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectStocks } from './slice/StockSlice';
import { Line } from 'react-chartjs-2';
import { io } from 'socket.io-client'
import { 
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const stocksSocket = io('http://localhost:443/stocks');

function StocksGrid() {
    const [openGraph, setOpenGraph] = React.useState(false);
    const [openTable, setOpenTable] = React.useState(false);
    const [chartData, setChartData] = React.useState(null);
    const [chartDate, setChartDate] = React.useState(null);
    const [chartOpen, setChartOpen] = React.useState(null);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            disableColumnMenu: true
        },
        {
            field: 'companyName',
            headerName: 'Компания',
            width: 200,
            disableColumnMenu: true
        },
        {
            field: 'companySymbol',
            headerName: 'Обозначение',
            width: 130,
            sortable: false,
            disableColumnMenu: true
        },
        {
            field: 'chartGraph',
            headerName: 'Графики',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <material.IconButton 
                    onClick={(event) => {
                        event.stopPropagation();
                        setChartData(params.row);
                        const date = [];
                        const open = [];
                        params.row.stock.forEach(stockItem => {
                            date.push(stockItem.Date);
                            open.push(parseFloat(stockItem.Open));
                        });
                        setChartDate(date);
                        setChartOpen(open);
                        setOpenGraph(true);
                    }}>
                    <icon.BarChart sx={{color: 'black', fontSize: 28}}/>
                </material.IconButton>
            ),
            disableColumnMenu: true
        },
        {
            field: 'chartTable',
            headerName: 'Таблицы',
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <material.IconButton 
                    onClick={(event) => {
                        event.stopPropagation();
                        setChartData(params.row);
                        setOpenTable(true);
                    }}>
                    <icon.TableChart sx={{color: 'black', fontSize: 28}}/>
                </material.IconButton>
            ),
            disableColumnMenu: true
        }
    ];

    const rows = useSelector((state) => selectStocks(state));
    
    const handleClose = () => {
        setOpenTable(false);
        setOpenGraph(false);
    };

    const data = {
        labels: chartDate?.reverse(),
        datasets: [
            {
                label: chartData?.companySymbol,
                data: chartOpen?.reverse(),
                fill: true,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <div style={{ height: 'auto', width: 'auto', backgroundColor: '#5a5a5a'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={8}
                pageSizeOptions={[8, 16]}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                    stocksSocket.emit('stocksSelection', newSelection);
                }}
                sx={{ color: 'white', fontSize: 18 }}
            />
            <material.Dialog
                open={openGraph} 
                onClose={handleClose}
                maxWidth='lg'
                fullWidth={true}
                >
                <material.DialogTitle>График</material.DialogTitle>
                <material.DialogContent>
                    <Line data={data} />
                </material.DialogContent>
                <material.DialogActions>
                    <material.Button onClick={handleClose}>
                        Закрыть
                    </material.Button>
                </material.DialogActions>
            </material.Dialog>
            <material.Dialog
                open={openTable} 
                onClose={handleClose}
                maxWidth='lg'
                fullWidth={true}
                >
                <material.DialogTitle>Таблица</material.DialogTitle>
                <material.DialogContent>
                    <material.Table aria-label='charts table'>
                        <material.TableHead>
                            <material.TableRow>
                                <material.TableCell>Дата</material.TableCell>
                                <material.TableCell>Открытие</material.TableCell>
                                <material.TableCell>Закрытие</material.TableCell>
                                <material.TableCell>Максимальная</material.TableCell>
                                <material.TableCell>Минимальная</material.TableCell>
                            </material.TableRow>
                        </material.TableHead>
                        <material.TableBody>
                            {chartData && chartData.stock.map(data => 
                                <material.TableRow
                                    key={data.Date}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <material.TableCell component='th' scope='row'>{data.Date}</material.TableCell>
                                    <material.TableCell component='th' scope='row'>{data.Open}</material.TableCell>
                                    <material.TableCell component='th' scope='row'>{data.Last}</material.TableCell>
                                    <material.TableCell component='th' scope='row'>{data.High}</material.TableCell>
                                    <material.TableCell component='th' scope='row'>{data.Low}</material.TableCell>
                                </material.TableRow>
                            )}
                        </material.TableBody>
                    </material.Table>
                </material.DialogContent>
                <material.DialogActions>
                    <material.Button onClick={handleClose}>
                        Закрыть
                    </material.Button>
                </material.DialogActions>
            </material.Dialog>
        </div>
    );
}

export default StocksGrid;