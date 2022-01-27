import { useMemo, useCallback, useEffect } from 'react'
import { getChildren } from '../../utils/utils'
import styles from './index.module.scss'

export default function Flip (props) {
    const { children, width, height, direction = 'up', deg = 90, duration = 0.5, className, ...otherProps } = props
    const childrenArr = useMemo(() => getChildren({ props }), [children]);
    const y = useMemo(() => ['right', 'left'].indexOf(direction) === -1, [direction])
    const forward = useMemo(() => ['left', 'down'].indexOf(direction) !== -1, [direction])

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.setProperty('--rotateHover', `rotate${y ? 'X' : 'Y'}(${forward ? '-' : ''}${deg}deg)`);
    }, [y, forward, deg]);
    const translateZ = useMemo(() => `translateZ(${parseInt((y ? height : width) / 2)}px)`, [y, width, height])
    const rotateMain = useMemo(() => `rotate${y ? 'X' : 'Y'}(0)`, [y, forward, deg])
    const rotateSub = useMemo(() => `rotate${y ? 'X' : 'Y'}(${forward ? '' : '-'}${deg}deg)`, [y, forward, deg])

    return (
        <div {...otherProps} style={{ width: width + 'px', height: height + 'px', transitionDuration: duration + 's' }} className={styles.wrap + ' ' + className}>
            <div className={styles.mainChild} style={{ transform: rotateMain + ' ' + translateZ }}>
                {getChildren(childrenArr[0]).map(child => child)}
            </div>
            <div className={styles.subChild} style={{ transform: rotateSub + ' ' + translateZ }}>
                {getChildren(childrenArr[1]).map(child => child)}
            </div>
        </div>
    )
}
