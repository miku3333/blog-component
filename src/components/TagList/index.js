import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss'
import { getData } from '../../utils/utils'

export default function TagList (props) {
    const {
        eachLine = 2,
        initData,
        config,
        itemHeight = 50,
        width = 400,
        firstColor = '#f5f5f5',
        secondColor = '#ffffff',
        hoverColor = '#edac96',
        rightButton,
        title = '',
        titleStyle = {
            height: '50px',
            lineHeight: '50px',
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        itemStyle = {
            textAlign: 'center',
        },
    } = props;
    const [data, setData] = useState([]);


    const appendData = () => {
        getData(initData, setData, config, handleData)
    };

    const handleData = (data) => {
        while (data.length % eachLine !== 0) {
            data.push({})
        }
        console.log(data);
        return data
    }

    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.setProperty('--hover', hoverColor);
    }, [hoverColor])

    useEffect(() => {
        appendData()
    }, []);

    const renderList = (data) => {
        let isFirstColor = true;
        return data.map((item, index) => {
            if ((index + 1) % eachLine === 0) {
                const result = <>
                    <div onClick={goPage(item.url)} style={{ backgroundColor: isFirstColor ? firstColor : secondColor, height: itemHeight, lineHeight: itemHeight + 'px', ...itemStyle }} className={item.text ? styles.item : styles.empty}>{item.text}</div>
                    <div className={styles.end}></div>
                </>
                isFirstColor = !isFirstColor
                return result
            }
            else {
                return <div onClick={goPage(item.url)} style={{ backgroundColor: isFirstColor ? firstColor : secondColor, height: itemHeight, lineHeight: itemHeight + 'px', ...itemStyle }} className={item.text ? styles.item : styles.empty}>{item.text}</div>
            }
        })
    }

    return (
        <div style={{ width, position: 'relative' }}>
            {title && <div style={titleStyle}>{title}</div>}
            {rightButton.text && <Button type="primary" className={styles.button} onClick={goPage(rightButton.url)}>{rightButton.text}</Button>}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {renderList(data)}
            </div>
        </div>
    );
}

