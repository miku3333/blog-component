import { useEffect } from "react";
import styles from './index.module.scss'

export default function ScaleImage (props) {
    const { height = '100%', width = '100%', scale = 2, time = 0.5, src, className = '', style, children, ...otherProps } = props;
    useEffect(() => {
        document.getElementsByTagName('body')[0].style.setProperty('--scale', scale);
        document.getElementsByTagName('body')[0].style.setProperty('--time', time + 's');
        console.log(otherProps);
    }, [scale, time])
    return (
        <div className={styles.img + ' ' + className} style={{ width, height, ...style }} {...otherProps}>
            <img src={src} />
            {children?.map ? children.map(child => child) : children}
        </div>
    )
}
