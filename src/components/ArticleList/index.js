import { useState, useEffect, useMemo, useCallback } from 'react';
import { List, message, Divider, Button } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from './index.module.scss'
import { FieldTimeOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import ScaleImage from '../ScaleImage'
import { getData } from '../../utils/utils'


export default function ArticleList (props) {
    const {
        config,
        containerHeight = 1000,
        containerWidth = 1000,
        itemHeight = 200,
        mainTagPosition = 'leftTop',
        scaleImageOptions = {},
        showToast = true,
        toast = '加载了${number}篇文章'
    } = props;
    const [data, setData] = useState([]);

    const mainTagPositionStyle = useMemo(() => {
        const text = mainTagPosition.toLowerCase();
        return {
            left: text.indexOf('left') !== -1 && '10px',
            right: text.indexOf('right') !== -1 && '10px',
            top: text.indexOf('top') !== -1 && '10px',
            bottom: text.indexOf('bottom') !== -1 && '10px',
        }
    }, [mainTagPosition])
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

    const { descriptionLine, descriptionHeihgt, imgWidth } = useMemo(() => {
        return {
            descriptionLine: parseInt((itemHeight - 120) / 21),
            descriptionHeihgt: parseInt((itemHeight - 120) / 21) * 21,
            imgWidth: parseInt((itemHeight - 24) / 9 * 16)
        }
    }, [itemHeight])

    const { wrapLeft, wrapWidth } = useMemo(() => {
        return {
            wrapLeft: imgWidth + 40,
            wrapWidth: containerWidth - imgWidth - 76
        }
    }, [imgWidth, containerWidth])

    return (
        <List style={{ width: containerWidth }}>
            <VirtualList
                data={data}
                height={containerHeight}
                itemHeight={itemHeight}
                itemKey="id"
                onScroll={onScroll}
            >
                {item => (
                    <List.Item key={item.id} style={{ height: itemHeight }} className={styles.item}>
                        <div className={styles.inner}>
                            <ScaleImage style={{ width: imgWidth }} className={styles.img} src={item.imgUrl} {...scaleImageOptions}>
                                {item?.mainTag.text && <div onClick={item.mainTag.url && goPage(item.mainTag.url)} className={styles.mainTag} style={mainTagPositionStyle}>{item.mainTag.text}</div>}
                            </ScaleImage>
                            <div style={{
                                width: wrapWidth,
                                left: wrapLeft
                            }} className={styles.wrap}>
                                <div className={styles.title} onClick={goPage(item.url)}>{item.title}</div>
                                <div className={styles.divider}>
                                    <Divider />
                                </div>
                                <div
                                    style={{ WebkitLineClamp: descriptionLine, height: descriptionHeihgt }}
                                    className={styles.description}
                                >
                                    {item.description}
                                </div>
                                <div className={styles.infoWrap}>
                                    <span className="tag"><TagsOutlined />{item.tag.join('|')}</span>
                                    <span className="time"><FieldTimeOutlined />{item.datetime}</span>
                                    <span className="pv"><EyeOutlined />{item.pv}</span>
                                </div>
                                <Button type="primary" className={styles.button} onClick={goPage(item.url)}>阅读更多</Button>
                            </div>
                        </div>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};