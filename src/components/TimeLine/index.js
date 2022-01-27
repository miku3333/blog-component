import { useState, useEffect, useCallback } from 'react';
import { message, Timeline } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from './index.module.scss'
import { getData } from '../../utils/utils'


export default function TimeLine (props) {
    const {
        config,
        containerHeight = 1000,
        containerWidth = 1000,
        mode = 'right',
        showToast = true,
        toast = '加载了${number}个节点'
    } = props;
    const [data, setData] = useState([]);

    const appendData = () => {
        getData('', setData, config, (resData) => {
            console.log(resData);
            showToast && message.success(toast.replaceAll('${number}', resData.length));
            return data.concat(resData)
        })
    };

    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop === containerHeight) {
            appendData();
        }
    };

    return (
        <Timeline style={{ width: containerWidth }} mode={mode}>
            <VirtualList
                data={data}
                height={containerHeight}
                itemKey="id"
                onScroll={onScroll}
            >
                {item => (
                    <Timeline.Item key={item.id} color={item.color}>
                        <div>{item.datetime}</div>
                        <div className={styles.text} onClick={goPage(item.url)}>{item.description}</div>
                    </Timeline.Item>
                )}
            </VirtualList >
        </Timeline>

    );
};