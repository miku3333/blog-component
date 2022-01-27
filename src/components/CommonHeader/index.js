import { useEffect, useCallback, useState } from 'react'
import styles from './index.module.scss'
import { Menu } from 'antd';
import {getData} from '../../utils/utils'

const { SubMenu, Item } = Menu;

export default function CommonHeader (props) {
    const { height = 50, initData, config } = props
    const [current, setCurrent] = useState()
    const [data, setData] = useState([])
    useEffect(() => {
        getData(initData, setData, config)
    }, [])
    const handleClick = useCallback((e) => {
        console.log('click ', e);
        setCurrent(e.key);
    }, [])
    const renderItem = useCallback((data) => {
        return data.map((item, index) => {
            const { key, title, disabled, url, children = [] } = item;
            if (item.type === 'menu') {
                console.log(children);
                return (
                    <SubMenu key={key} title={title} disabled={disabled}>
                        {children.map((child) => {
                            return (
                                <Menu.ItemGroup key={child.title} title={child.title}>
                                    {renderItem(child.data)}
                                </Menu.ItemGroup>
                            )
                        })}
                    </SubMenu>
                )
            }
            else if (item.type === 'link') {
                return (
                    <Item key={key} disabled={disabled}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {title}
                        </a>
                    </Item>
                )
            }
            else {
                return (
                    <Item key={key} disabled={disabled}>
                        {title}
                    </Item>
                )
            }
        })
    }, [])
    return (
        <div
            className={styles.header}
            style={{ height: height + 'px' }}
        >
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{ width: '100%' }}>
                {renderItem(data)}
            </Menu>
        </div>
    )
}
