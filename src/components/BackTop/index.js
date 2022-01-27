import { BackTop } from 'antd';

export default function MyBackTop (props) {
    return (
        <BackTop {...props}>
            {Array.isArray(props.children) ? props.children.map(item => item) : props.children}
        </BackTop>
    )
}
