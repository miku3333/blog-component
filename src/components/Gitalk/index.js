import GitalkComponent from "gitalk/dist/gitalk-component";
import 'gitalk/dist/gitalk.css'

export default function MyGitalk (props) {
    return (
        <GitalkComponent {...props} />
    )
}
