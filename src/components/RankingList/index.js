import React, { useEffect, useCallback, useState } from 'react'
import styles from './index.module.scss'
import { List } from 'antd';
import { getData } from '../../utils/utils'

export default function RankingList (props) {
    const { initData, config, width = 250, maxLength = 10, header = "", footer = "" } = props
    const [data, setData] = useState([]);
    const appendData = () => {
        getData(initData, setData, config)
    };
    useEffect(() => {
        appendData();
    }, []);
    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])
    const renderItem = useCallback((item, index) => {
        let indexClass;
        switch (index) {
            case 0: indexClass = 'first'; break;
            case 1: indexClass = 'second'; break;
            case 2: indexClass = 'third'; break;
        }
        return (
            <List.Item key={item.id} className={index % 2 ? styles.even : styles.odd}>
                <div className={styles.number + ' ' + styles[indexClass]}>{index + 1}</div>
                <div className={styles.text} onClick={item.url && goPage(item.url)}>{item.text}</div>
            </List.Item >
        )
    }, [])
    return (
        <div style={{ width }}>
            <List
                size="small"
                header={header && <div className={styles.title}>{header}</div>}
                footer={footer && <div>{footer}</div>}
                bordered
                dataSource={data.slice(0, maxLength)}
                renderItem={renderItem}
            />
        </div>
    )
}
