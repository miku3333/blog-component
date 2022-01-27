import ReactWEditor from 'wangeditor-for-react';

export default function MyEditor (props) {
    return (
        <ReactWEditor
            defaultValue={'<h1>标题</h1>'}
            linkImgCallback={(src, alt, href) => {
                // 插入网络图片的回调事件
                console.log('图片 src ', src)
                console.log('图片文字说明', alt)
                console.log('跳转链接', href)
            }}
            onlineVideoCallback={(video) => {
                // 插入网络视频的回调事件
                console.log('插入视频内容', video)
            }}
            onChange={(html) => {
                console.log('onChange html:', html)
            }}
            onBlur={(html) => {
                console.log('onBlur html:', html)
            }}
            onFocus={(html) => {
                console.log('onFocus html:', html)
            }}
            {...props}
        />
    );
}
