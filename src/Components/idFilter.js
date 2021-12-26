import React, { useEffect, useState, useRef, Fragment } from 'react'
import logo_twitch from '../Images/twitch_mini_logo.png'
import logo_youtube from '../Images/youtube_mini_logo.png'
import logo_x from '../Images/x_mini_logo.png'
import '../Style/style.css'

var a = `
민트_초ㅋ (dmsnwl94): 아하
middleage_: 혹시 최하급보석 많으신분~
햝햝햝햝 (forke1212): 횃불 인벤에 넣는가 안넣는가 보고있습니다 후후아
민트_초ㅋ (dmsnwl94): 어쩐지 이야기 하는게 맛갈나게 잘 푸시더라고
불멸의거너스 (kikwsi): 웹소설 작가가 목표이신가요?
불멸의거너스 (kikwsi): 아하..ㅎㅎ 하시면 챙겨볼게요!
gun6750: 저요!
불멸의거너스 (kikwsi): 저 어제 아트마요~
middleage_: 저요~
쉬리한마리 (wnssl611): ㄱ
민트_초ㅋ (dmsnwl94): 아하2
`
var b = `

foofoo woo
​와 탈갑이네 먹으려고 2주동안 다녔는데 안나오네요

glory kim
​엘드리치 나눔좀 .

박세연
​주시면 감사하겠습니당 ^^;;

foofoo woo
​탈갑이나 탈목 드랍으로 드신분 계시나요 혹시 ?

티님t
​안녕하세요~~ 늦었네요~

박세연
​저요!

aaaaaa
​아

glory kim
​저요~~
`

const removeBlank = (arr) => {
    const arrResult = arr.reduce(function (result, data) {
        if (data !== '')
            result.push(data);
        return result;
    }, []);

    return arrResult;
}
const parsingDatas = (arr, platform) => {
    const arrResult = arr.map((data) => {
        const json = {
            platform,
            id: data.substring(0, data.indexOf(':')).trim(),
            msg: data.substring(data.indexOf(':') + 1, data.length).trim()
        }
        return json;
    });
    return arrResult;
}

const IdFilter = () => {
    const overlabRemoveCheckboxRef = useRef();
    const twitchTextAreaRef = useRef();
    const youtubeTextAreaRef = useRef();

    const [searchText, setSearchText] = useState('');
    const [overlabChecked, setOverlabChecked] = useState(true);

    const [chattingTextList, setChattingTextList] = useState([]);
    const [winnerList, setWinnerList] = useState([]);

    useEffect(() => {
        let tempArr = []
        // 검색어들만 tempArr에 push
        const searchArr = searchText.split(',');
        for (const i in chattingTextList) {
            const arr = chattingTextList[i];
            const msg = chattingTextList[i].msg;
            // 검색에서 공백은 Pass
            if(searchText !== ''){
                // 검색어 구분 ','로 하고 배열을 돌음
                for(const i in searchArr){
                    const searchItem = searchArr[i];
                    // 검색어 사이 공백은 pass
                    if(searchItem !== ''){
                        const isSearchText = msg.indexOf(searchArr[i].trim());
                        if (isSearchText > -1) {
                            tempArr.push(arr)
                            break;
                        }
                    }
                }
            }
        }

        // 중복 제거 체크박스 체크 여부(체크되어 있으면 중복제거)
        if (overlabChecked) {
            const arrResult = tempArr.reduce(function (result, data) {
                // 중복된 값을 찾아서 overlabFilter함수에 담음(중복이면 2개 이상의 값이 들어감)
                const overlabFilter = tempArr.filter(obj => {
                    return data.id === obj.id;
                });

                // 중복된 값이 있다면
                if (overlabFilter.length > 1) {
                    const subFilter = result.filter(item => {
                        return data.id === item.id;
                    });
                    if (subFilter.length < 1) {
                        result.push({
                            platform: 'overlab',
                            id: data.id,
                            msg: data.msg
                        })
                    }
                }
                else {
                    result.push(data)
                }
                return result;
            }, []);
            setWinnerList(arrResult)
        }
        else
            setWinnerList(tempArr)
    }, [overlabChecked, searchText, chattingTextList])

    const onChangeSearchText = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText.trim())
    }

    const onChangeOverlabCheckbox = (e) => {
        const isChecked = e.target.checked;
        setOverlabChecked(isChecked)
    }

    const onClickWinnerListCopy = (e) => {
        let copyIDList = '';
        for (const i in winnerList) {
            copyIDList += winnerList[i].id + '\n'
        }
        const t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = copyIDList;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);

        alert('복사되었습니다.')
    }

    const onChangeTextArea = (e) => {
        const twitchText = twitchTextAreaRef.current.value;
        const youtubeText = `\n\n` + youtubeTextAreaRef.current.value;     // 유튜브는 한줄로 안나와서 맨첨에 \n\n 넣어서 첫번째도 걸릴 수 있게 처리함

        /* Twitch */
        let arrTemp = twitchText.split(/\r?\n/);
        const refinedTwitchData = removeBlank(arrTemp)
        const arrTwitch = parsingDatas(refinedTwitchData, 'twitch');
        /* // Twitch */

        /* Youtube */
        let tempSplitArr = youtubeText.split(/\r?\n{2,}/);        // 유튜브 댓글은 한줄로 안나와서 한줄로 만들어줘야함
        tempSplitArr = tempSplitArr.map((data) => data.replace('\n', ':'))      // 유튜브 댓글 아이디와 채팅 사이에 \n이 들어가서 :로 바꿔주기
        tempSplitArr = tempSplitArr.map((data) => data.replace('\t', ''))      // 유튜브 댓글 아이디와 채팅 사이에 \n이 들어가서 :로 바꿔주기
        const refinedYoutubeData = removeBlank(tempSplitArr)
        const arrYoutube = parsingDatas(refinedYoutubeData, 'youtube');
        /* // Youtube */

        const arrResult = [...arrTwitch, ...arrYoutube]

        setChattingTextList(arrResult)
    }

    return (
        <div id="id_filter">
            <div className="top_menu">
                <label>검색어: </label>
                <input type='text' onChange={onChangeSearchText} placeholder='검색어1, 검색어2' />

                <label>중복 제거</label>
                <input type="checkbox" defaultChecked="true" onChange={onChangeOverlabCheckbox} ref={overlabRemoveCheckboxRef} />
            </div>

            <div className="content">
                <div className="content_box chatting">
                    <div className="twitch_chatting_box">
                        <img src={logo_twitch} className={'logo_twitch'} />
                        <label>Twitch Chatting</label>
                        <textarea onChange={onChangeTextArea} ref={twitchTextAreaRef} />
                    </div>

                    <div className="youtube_chatting_box">
                        <img src={logo_youtube} className={'logo_youtube'} />
                        <label>Youtube Chatting</label>
                        <textarea onChange={onChangeTextArea} ref={youtubeTextAreaRef} />
                    </div>
                </div>

                <div className="content_box result">
                    <div className="result_banner">
                        <h2>당첨자 {winnerList.length}명</h2>
                        <button onClick={onClickWinnerListCopy}>ID 복사</button>
                    </div>
                    {
                        winnerList.map((data, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <div className="winner_box" style={ data.platform === 'overlab' ? {backgroundColor:'red'} : {}}>
                                        <img src={data.platform === 'twitch' ? logo_twitch : data.platform === 'youtube' ? logo_youtube : logo_x} />
                                        <label className="winner_id">{data.id}</label>
                                        <label className="winner_msg">{data.msg}</label>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default IdFilter;
