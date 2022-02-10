import CommonHeader from './components/CommonHeader'
import RankingList from './components/RankingList'
import ArticleList from './components/ArticleList'
import ScaleImage from './components/ScaleImage'
import MessageBoard from './components/MessageBoard'
import TimeLine from './components/TimeLine'
import Carousel from './components/Carousel'
import TagList from './components/TagList'
import BackTop from './components/BackTop'
import CursorEffect from './components/CursorEffect'
import Live2D from './components/Live2D'
import Layout from './components/Layout'
import Editor from './components/Editor'
import Flip from './components/Flip'
import InfoWrap from './components/InfoWrap'
import Gitalk from './components/Gitalk'
import Calendar from './components/Calendar'
import File from './components/File'
import FloatImage from './components/FloatImage'

function App () {
    const data = [
        {
            "id": "1111",
            "text": "矿方根候劳极造级始至京任音候市何养住电下理议红见法必队每商矿保变例平往正目压备拉学包统率同称活时文马好人识心认子物构每法特委所群名代思况家选道热质制约北经务完深铁低包自委并义话细越听习件党社声东连到小子海商克更至土识色照进都接话和验己从院统派商可空写例。",
            "url": "tn3270://vpdp.sl/oihmykx",
        },
        {
            "id": "2111",
            "text": "矿方根候劳极造级始至京任音候市何养住电下理议红见法必队每商矿保变例平往正目压备拉学包统率同称活时文马好人识心认子物构每法特委所群名代思况家选道热质制约北经务完深铁低包自委并义话细越听习件党社声东连到小子海商克更至土识色照进都接话和验己从院统派商可空写例。",
            "url": "tn3270://vpdp.sl/oihmykx",
        },
        {
            "id": "51972",
            "text": "矿方根候劳极造级始至京任音候市何养住电下理议红见法必队每商矿保变例平往正目压备拉学包统率同称活时文马好人识心认子物构每法特委所群名代思况家选道热质制约北经务完深铁低包自委并义话细越听习件党社声东连到小子海商克更至土识色照进都接话和验己从院统派商可空写例。",
            "url": "tn3270://vpdp.sl/oihmykx",
        }
    ]
    return (
        <div>
            {/* <CommonHeader config={{ api: '/api/commonHeader', userProcess: (data) => data.list }}></CommonHeader> */}
            {/* <RankingList config={{ api: '/api/articleList', userProcess: (data) => data.list }}></RankingList> */}
            {/* <RankingList initData={data}></RankingList> */}
            {/* <ArticleList config={{ api: '/api/articleList', userProcess: data => data.list }}></ArticleList> */}
            {/* <ScaleImage src={'http://dummyimage.com/800x450'}>
                1111
            </ScaleImage> */}
            {/* <MessageBoard config={{ api: '/api/articleList', userProcess: data => data.list }}></MessageBoard> */}
            {/* <MessageBoard initData={data}></MessageBoard> */}
            <TimeLine config={{ api: "/api/articleList", userProcess: data => data.list }}></TimeLine>
            {/* <Carousel config={{ api: "/api/articleList", userProcess: data => data.list }}></Carousel> */}
            {/* <TagList config={{ api: "/api/articleList", userProcess: data => data.list }}></TagList> */}
            {/* <BackTop></BackTop> */}
            {/* <CursorEffect></CursorEffect> */}
            {/* <Live2D width={300} height={500} ModelList={['chuixue_3']}></Live2D> */}
            {/* <Layout>
                <div width="20">test1</div>
                <div width="20"></div>
                <div width="40">
                    test2
                    <div>test2.1</div>
                    <div>test2.2</div>
                    <div>test2.3</div>
                </div>
                <div width="20">test3</div>
            </Layout> */}
            {/* <Editor></Editor> */}
            {/* <Flip width='400' height='400'>
                <div>
                    <div style={{ width: '100%', height: '100%', background: '#ffffcc' }}>222</div>
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <div style={{ width: '100%', height: '100%', background: '#ffccff' }}>33</div>
                </div>
            </Flip> */}
            {/* <Flip>
                <div>
                    <div style={{ width: '100%', height: '100%', background: '#ffffcc' }}>222</div>
                </div>
            </Flip> */}
            {/* <InfoWrap config={{ api: "/api/userInfo" }}></InfoWrap> */}
            {/* <InfoWrap initData={data}></InfoWrap>; */}
            {/* <Gitalk
                options={{
                clientID: '739e7694f0010709d990', // GitHub Application Client ID
                clientSecret: 'd57f65922295a2045fd65e59f7a32a855ac1f0a0', // GitHub Application Client Secret
                repo: 'talk',      // 存放评论的仓库
                owner: 'miku3333',          // 仓库的创建者，
                admin: ['miku3333'],        // 如果仓库有多个人可以操作，那么在这里以数组形式写出
                }}
            >
            </Gitalk> */}
            {/* <Calendar monthConfig={{ api: '/api/calendar/month', userProcess: data => data.days }} ></Calendar> */}
            {/* <File config={{ api: "/api/articleList", userProcess: data=>data.list }}></File> */}
            {/* <File initData={data}></File>; */}
            {/* <FloatImage></FloatImage> */}
            {/* <CommonHeader config={{ api: "/api/commonHeader" }}></CommonHeader> */}
        </div>
    );
}

export default App;
