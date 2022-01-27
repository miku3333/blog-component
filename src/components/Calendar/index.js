import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Calendar, Badge } from 'antd';
import { getData } from '../../utils/utils'

export default function MyCalendar (props) {
    const { monthConfig, yearConfig } = props;
    const [currentMonth, setCurrentMonth] = useState([])
    const [currentYear, setCurrentYear] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    useEffect(() => {
        monthConfig && getData('', setCurrentMonth, { ...monthConfig, param: { ...monthConfig.param, month: year + month } })
    }, [month])
    useEffect(() => {
        yearConfig && getData('', setCurrentYear, { ...yearConfig, param: { ...yearConfig.param, year } })
    }, [year])
    const monthCellRender = useCallback(value => {
        const listData = currentYear.length && value.year() === year ? currentYear[value.month()].task : [];
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }, [currentYear])
    const dateCellRender = useCallback(value => {
        const listData = currentMonth.length && value.month() === month ? currentMonth[value.date()].task : [];
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }, [currentMonth])
    const handleChange = useCallback(value => {
        setMonth(value.month());
        setYear(value.year());
    }, [])
    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onChange={handleChange}>

        </Calendar>
    )
}
