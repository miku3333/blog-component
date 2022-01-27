import { useState, useEffect, useCallback, useRef } from 'react';
import { Carousel } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
import { getData } from '../../utils/utils'

export default function Carousel1 (props) {
    const {
        initData,
        config,
        showSideButton = true,
        width = 1000,
        height = 200,
        time = 0,
        type = 'text',
        autoplay = false,
        contentStyle = {
            color: '#fff',
            textAlign: 'center',
            background: '#364d79',
            verticalAlign: 'middle'
        },
        ...otherProps
    } = props;
    const [data, setData] = useState([]);
    const [timer, setTimer] = useState()
    const [inArea, setInArea] = useState(false);

    const appendData = () => {
        getData(initData, setData, config)
    };

    const changeInArea = useCallback((status) => () => {
        setInArea(status)
    }, [])

    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])

    useEffect(() => {
        appendData();
    }, []);

    useEffect(() => {
        if (time !== 0) {
            if (!inArea) {
                const interval = setInterval(() => {
                    carousel.current?.next()
                }, time)
                setTimer(interval)
            }
            else {
                clearInterval(timer)
            }
        }
    }, [inArea])

    const next = useCallback(() => {
        carousel.current?.next()
    }, [])

    const prev = useCallback(() => {
        carousel.current?.prev()
    }, [])

    const carousel = useRef()

    return (
        <div style={{ width, height, position: 'relative' }} onMouseEnter={changeInArea(true)} onMouseLeave={changeInArea(false)}>
            <Carousel autoplay={autoplay && time === 0} ref={carousel} {...otherProps}>
                {data.map((item) => {
                    if (type === 'image') {
                        return <img key={item.id} height={height} width={width} src={item.imgUrl} onClick={goPage(item.url)} />
                    }
                    else {
                        return <div key={item.id} onClick={goPage(item.url)}>
                            <div style={{ width, height, lineHeight: height + 'px', ...contentStyle }}>
                                {item.title}
                            </div>
                        </div>
                    }
                })}
            </Carousel>
            {
                showSideButton && <div className={styles.wrap} style={{ left: 0 }}>
                    <LeftCircleOutlined onClick={prev} className={styles.button} />
                </div>
            }
            {
                showSideButton && <div className={styles.wrap} style={{ right: 0 }}>
                    <RightCircleOutlined onClick={next} className={styles.button} />
                </div>
            }
        </div>
    )
}
