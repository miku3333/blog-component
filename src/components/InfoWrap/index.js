import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import {
    GithubOutlined,
    WeiboOutlined,
    TwitterOutlined,
    WechatOutlined,
    QqOutlined,
    FacebookOutlined,
    ZhihuOutlined,
    InstagramOutlined,
} from '@ant-design/icons';
import { getData } from '../../utils/utils'

export default function InfoWrap (props) {
    const { initData, config, avatarSize = 200, width = 500, height = 1000} = props;
    const [data, setData] = useState({});
    const appendData = () => {
        getData(initData, setData, config)
    };
    const goPage = useCallback((url) => () => {
        window.location.href = url
    }, [])
    useEffect(() => {
        appendData()
    }, [])
    return (
        <div className={styles.wrap} style={{width, height}}>
            <div className={styles.avatar} style={{ width: avatarSize, height: avatarSize, background: `url("${data.imgUrl}") no-repeat top/contain` }} />
            <div className={styles.name}>{data.name}</div>
            <div className={styles.profile}>{data.profile}</div>
            <div className={styles.tagList}>{data.tagList?.map(tag =>
                <div className="link" onClick={goPage(tag.url)}>
                    <div>{tag.name}</div>
                    <div>{tag.num}</div>
                </div>
            )}</div>
            <div className={styles.otherAccount}>
                {data.githubUrl && <div className={styles.accountItem}>
                    <GithubOutlined onClick={goPage(data.githubUrl)} style={{ marginRight: '5px' }} />Github
                </div>}
                {data.weiboUrl && <div className={styles.accountItem}>
                    <WeiboOutlined onClick={goPage(data.weiboUrl)} style={{ marginRight: '5px' }} />微博
                </div>}
                {data.twitterUrl && <div className={styles.accountItem}>
                    <TwitterOutlined onClick={goPage(data.twitterUrl)} style={{ marginRight: '5px' }} />Twitter
                </div>}
                {data.wechatUrl && <div className={styles.accountItem}>
                    <WechatOutlined onClick={goPage(data.wechatUrl)} style={{ marginRight: '5px' }} />微信
                </div>}
                {data.qqUrl && <div className={styles.accountItem}>
                    <QqOutlined onClick={goPage(data.qqUrl)} style={{ marginRight: '5px' }} />QQ
                </div>}
                {data.facebookUrl && <div className={styles.accountItem}>
                    <FacebookOutlined onClick={goPage(data.facebookUrl)} style={{ marginRight: '5px' }} />Facebook
                </div>}
                {data.zhihuUrl && <div className={styles.accountItem}>
                    <ZhihuOutlined onClick={goPage(data.zhihuUrl)} style={{ marginRight: '5px' }} />知乎
                </div>}
                {data.instagramUrl && <div className={styles.accountItem}>
                    <InstagramOutlined onClick={goPage(data.instagramUrl)} style={{ marginRight: '5px' }} />Instagram
                </div>}
            </div>
        </div>
    )
}
