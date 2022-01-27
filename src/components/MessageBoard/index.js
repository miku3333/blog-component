import { useState, useEffect, useMemo, useCallback } from 'react';
import { List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from './index.module.scss'
import { getData } from '../../utils/utils'


export default function MessageBoard (props) {
    const {
        initData,
        config,
        showToast = true,
        toast = '加载了${number}条留言',
        containerHeight = 550,
        eachLine = 4,
        itemSize = 200,
        margin = 36,
        colorList = ['#F3F3F3', '#FFFFCC', '#FFCCFF', '#CCFFFF'],
        scale = 1.2,
        degRange = 30
    } = props;
    const [data, setData] = useState([]);

    const handleData = (data) => {
        const result = [];
        while (data.length > 0) {
            result.push(data.slice(0, eachLine).map(item => {
                if (!item.deg) {
                    item.deg = randomDeg();
                }
                if (!item.color) {
                    item.color = randomColor();
                }
                return item
            }))
            data.splice(0, eachLine);
        }
        return result;
    }

    const appendData = (init = false) => {
        getData([...initData], setData, config, resData => {
            showToast && !init && message.success(toast.replaceAll('${number}', resData.length));
            return data.concat(handleData(resData))
        })
    };

    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])

    const randomDeg = () => {
        return parseInt(Math.random() * degRange * 2) - degRange;
    }

    const randomColor = () => {
        return colorList[parseInt(Math.random() * colorList.length)]
    }

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.setProperty('--scale', scale);
    }, [scale]);

    useEffect(() => {
        appendData(true);
    }, []);

    const onScroll = e => {
        if (config?.api && e.target.scrollHeight - e.target.scrollTop === containerHeight) {
            appendData();
        }
    };

    const { containerWidth, itemHeight } = useMemo(() => ({
        // containerHeight: eachColumn * itemSize + eachColumn * 2 * margin,
        containerWidth: eachLine * itemSize + eachLine * 2 * margin,
        itemHeight: itemSize + 2 * margin
    }), [eachLine, itemSize, margin]);

    const { textLine, textHeight } = useMemo(() => {
        return {
            textLine: parseInt((itemSize - 72) / 30),
            textHeight: parseInt((itemSize - 72) / 30) * 30
        }
    }, [itemSize])

    return (
        <List style={{ width: containerWidth }}>
            <VirtualList
                data={data}
                height={containerHeight}
                itemHeight={itemHeight}
                itemKey="id"
                onScroll={onScroll}
            >
                {each => (
                    <List.Item key={each[0].id + 'id'} style={{ height: itemHeight }} className={styles.each}>
                        {each.map(item => {
                            return (
                                <div onClick={goPage(item.url)} key={item.id} className={styles.item} style={{ height: itemSize, width: itemSize, margin, transform: `rotate(${item.deg}deg)`, backgroundColor: item.color }}>
                                    <div className={styles.icon}></div>
                                    <div className={styles.time}>{item.datetime}</div>
                                    <div className={styles.text} style={{ WebkitLineClamp: textLine, height: textHeight}}>{item.description}</div>
                                </div>
                            )
                        })}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};