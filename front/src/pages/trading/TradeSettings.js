import React from 'react';
import * as material from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTradingStocks, addTradingStocksInfo } from './slice/TradeSlice';
import { io } from 'socket.io-client';

const stocksSocket = io('http://localhost:443/stocks');

function SettingTrade() {
    const dispatch = useDispatch();
    const currentStocks = useSelector((state) => selectTradingStocks(state));

    const [openTrade, setOpenTrade] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState('2021-01-01');
    const [speed, setSpeed] = React.useState(1);
    
    function handleDateChange(date) {
        const validDate = date.split('-');
        const validDateStr = `${validDate[1]}/${validDate[2]}/${validDate[0]}`;
        stocksSocket.emit('getStocksInfo', validDateStr);
    }

    React.useEffect(() => {
        console.log(currentStocks);
        if (currentStocks.length > 0) {
            handleDateChange(currentDate);
        }

        const handleStocksInfo = (stocks) => {
            stocks.forEach(stock => {
                if (stock.data) {
                    const dateParts = stock.data.Date.split('/');
                    stock.data.Date = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
                    stock.data.Open = stock.data.Open.replace('$', '');
                }
            });
            dispatch(addTradingStocksInfo(stocks))
        }
    
        stocksSocket.on('currentStocksInfo', handleStocksInfo);

        return () => {
            stocksSocket.off('currentStocksInfo', handleStocksInfo);
        }
    }, [currentStocks, dispatch, currentDate]);

    React.useEffect(() => {
        let interval;
        if (openTrade) {
            interval = setInterval(() => {
                setCurrentDate(currentDate => {
                    const dateParts = currentDate.split('-');
                    const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
                    date.setDate(date.getDate() + 1);
                    const newDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    handleDateChange(newDate);
                    return newDate;
                });
            }, 1000 / speed);
        }
        return () => clearInterval(interval);
    }, [openTrade, currentDate, speed]);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'row', width: 'auto', height: 'auto'}}>
                <material.TextField 
                    helperText={speed < 1 ? 'Скорость торговли' : ''}
                    margin='dense'
                    id='speed'
                    label='Скорость торговли'
                    type='number'
                    sx={{ width: 170, backgroundColor: '#5a5a5a', mr: 2, borderRadius: 1}}
                    InputProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    inputProps={{ min: 1}}
                    value={speed}
                    onChange={e => setSpeed(Number(e.target.value))}
                    disabled={openTrade}
                />
                <material.TextField 
                    margin='dense'
                    id='date'
                    type='date'
                    fullWidth
                    InputLabelProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    InputProps={{
                        style: {
                            color: 'white',
                        },
                    }}
                    sx={{width: 170, backgroundColor: '#5a5a5a'}}
                    value={currentDate}
                    disabled={openTrade}
                    onChange={e => {
                        setCurrentDate(e.target.value);
                        handleDateChange(e.target.value);
                    }}
                />
            </div>
            <div>
                <material.Button
                    id='start'
                    sx={{borderRadius: 3, margin: 2}}
                    variant='outlined'
                    disabled={speed < 1}
                    onClick={() => {
                        setOpenTrade(true)
                        stocksSocket.emit('startTrade', { speed, currentDate});
                    }}>
                    Старт
                </material.Button>
                <material.Button
                    id='stop'
                    sx={{borderRadius: 3, margin: 2}}
                    variant='outlined'
                    onClick={() => setOpenTrade(false)}
                    >
                    Стоп
                </material.Button>
            </div>
            <div>
                <material.Table aria-label='charts table' sx={{ minWidth: 400, width: 'auto', backgroundColor: '#5a5a5a' }}>
                    <material.TableHead>
                        <material.TableRow>
                            <material.TableCell sx={{color: 'white', fontSize: 16}}>Название</material.TableCell>
                            <material.TableCell sx={{color: 'white', fontSize: 16}}>Дата</material.TableCell>
                            <material.TableCell sx={{color: 'white', fontSize: 16}}>Цена</material.TableCell>
                        </material.TableRow>
                    </material.TableHead>
                    <material.TableBody>
                        {currentStocks.map(stock => {
                            const currentStockDate = stock.data ? stock.data.Date : currentDate;
                            const currentPrice = stock.data ? stock.data.Open : 'N/A';
                            // const currentStock = data.stock.find(stock => stock.Date === currentDate);
                            return (
                                <material.TableRow
                                    key={stock.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <material.TableCell sx={{color: 'white', fontSize: 16}} component='th' scope='row'>{stock.companySymbol}</material.TableCell>
                                    <material.TableCell sx={{color: 'white', fontSize: 16}}>{currentStockDate}</material.TableCell>
                                    <material.TableCell sx={{color: 'white', fontSize: 16}}>{currentPrice}</material.TableCell>
                                </material.TableRow>
                            );
                        })}
                    </material.TableBody>
                </material.Table>
            </div>
        </>
    );
}

export default SettingTrade;