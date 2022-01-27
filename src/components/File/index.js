import { useEffect, useCallback, useState, useMemo } from 'react'
import styles from './index.module.scss'
import { List } from 'antd';
import { divideData } from '../../utils/utils'
import { getData } from '../../utils/utils'

export default function File (props) {
    const {
        initData,
        config,
        width = "800",
        eachline = 2,
        header = "",
        footer = "",
        titleStyle = {
            height: '50px',
            lineHeight: '50px',
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
        }
    } = props
    const [data, setData] = useState([])
    const itemWidth = useMemo(() => parseInt((width - 64) / eachline) + 'px', [width])
    const appendData = () => {
        getData(initData, setData, config, formatData)
    };

    const formatData = (data) => {
        return divideData(data, eachline);
    }

    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])

    useEffect(() => {
        appendData();
    }, []);
    const renderItem = useCallback((item) => {
        return (
            <List.Item className={styles.wrap} key={item[0].text} style={{ display: 'flex' }}>
                {item.map(child => {
                    return <div className={styles.item} style={{ maxWidth: parseInt(100 / eachline) + '%' }} onClick={child.url && goPage(child.url)}>{child.text}</div>
                })}
            </List.Item >
        )
    }, [])
    return (
        <div style={{ width: width + 'px' }}>
            <List
                size="small"
                header={header && <div style={titleStyle}>{header}</div>}
                footer={footer && <div>{footer}</div>}
                bordered
                dataSource={data}
                renderItem={renderItem}
            />
        </div>
    )
}
