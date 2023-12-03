import React from 'react';
import * as material from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTradingStocks } from './slice/TradeSlice';

function SettingTrade() {
    const currentStocks = useSelector((state) => selectTradingStocks(state));
    let minDate = null;
    let maxDate = null;
    if (currentStocks.length !== 0) {
        minDate = currentStocks[0].stock[currentStocks[0].stock.length - 1].Date;
        maxDate = currentStocks[0].stock[0].Date;
    }
    const [openTrade, setOpenTrade] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState(minDate ? minDate : '2021-01-01');
    const [speed, setSpeed] = React.useState(1);

    React.useEffect(() => {
        let interval;
        if (openTrade) {
            interval = setInterval(() => {
                if (currentDate === maxDate) {
                    setOpenTrade(false);
                }
                setCurrentDate(currentDate => {
                    const dateParts = currentDate.split('-');
                    const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
                    date.setDate(date.getDate() + 1);
                    const newDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    return newDate;
                });
                console.log(currentDate);
            }, 1000 / speed);
        }
        return () => clearInterval(interval);
    }, [openTrade, currentDate, maxDate, speed]);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'row', width: 'auto', height: 'auto'}}>
                <material.TextField 
                    helperText={speed < 0 ? 'Скорость торговли' : ''}
                    margin='dense'
                    id='speed'
                    label='Скорость'
                    type='number'
                    sx={{ width: 170, backgroundColor: '#5a5a5a', mr: 2}}
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
                    inputProps={{ min: 0}}
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
                    inputProps={{ min: minDate ? minDate : '2021-01-01', max: maxDate ? maxDate : '2024-01-01'}}
                    value={currentDate}
                    disabled={openTrade}
                    onChange={e => setCurrentDate(e.target.value)}
                />
            </div>
            <div>
                <material.Button
                    id='start'
                    sx={{borderRadius: 3, margin: 2}}
                    variant='outlined'
                    disabled={speed < 0}
                    onClick={() => setOpenTrade(true)}>
                    Старт
                </material.Button>
                <material.Button
                    id='stop'
                    sx={{borderRadius: 3, margin: 2}}
                    variant='outlined'
                    onClick={() => setOpenTrade(false)}>
                    Стоп
                </material.Button>
            </div>
            <div>
                <material.Table aria-label='charts table' sx={{ minWidth: 400, width: 'auto', backgroundColor: '#5a5a5a' }}>
                    <material.TableHead>
                        <material.TableRow>
                            <material.TableCell>Название</material.TableCell>
                            <material.TableCell>Дата</material.TableCell>
                            <material.TableCell>Цена</material.TableCell>
                        </material.TableRow>
                    </material.TableHead>
                    <material.TableBody>
                        {currentStocks && currentStocks.map(data => {
                            const currentStock = data.stock.find(stock => stock.Date === currentDate);
                            return (
                                <material.TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <material.TableCell component='th' scope='row'>{data.companySymbol}</material.TableCell>
                                    <material.TableCell>{currentDate}</material.TableCell>
                                    <material.TableCell>{currentStock ? currentStock.Open : 'N/A'}</material.TableCell>
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