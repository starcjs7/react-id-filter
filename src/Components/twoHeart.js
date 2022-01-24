import React, { useEffect, useState, useRef, Fragment } from 'react'
import logo_twitch from '../Images/twitch_mini_logo.png'
import logo_youtube from '../Images/youtube_mini_logo.png'
import logo_x from '../Images/x_mini_logo.png'
import '../Style/style.css'

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

        const searchText_Upper = searchText.toUpperCase();
        const searchTextLength = searchText.length;

        let tempArr = []
        // 검색어들만 tempArr에 push
        for (const i in chattingTextList) {
            const arr = chattingTextList[i];
            // const msg = chattingTextList[i].msg.toUpperCase().replace(/\s|,/gi, '');
            const msg = chattingTextList[i].msg.toUpperCase().replace(/[^A-Z|a-z]/gi, '');
            console.log(msg)

            let point = 0;

            // 검색에서 공백은 Pass
            if(searchText_Upper !== ''){
                // 검색어 사이 공백은 pass
                    if(searchText_Upper !== ''){

                        for(const j in searchText_Upper){
                            if(searchText_Upper[j] === msg[j]){
                                point++
                            }
                        }
                        
                        const percent  = Math.ceil(point * (100 / searchTextLength));
                        tempArr.push({
                            platform: arr.platform,
                            id: arr.id,
                            msg: msg,
                            percent: percent
                        })
                    }
            }
        }

        // Rank 별로 Order by 정렬
        tempArr.sort((a, b) => {
            if (a.percent < b.percent)
                return 1;
            if (a.percent > b.percent)
                return -1;
            return 0;
        });

        // 중복 제거 체크박스 체크 여부(체크되어 있으면 중복제거)
        if (overlabChecked) {
            const arrResult = tempArr.reduce(function (result, data) {
                // 중복된 값을 찾아서 overlabFilter함수에 담음(중복이면 2개 이상의 값이 들어감)
                const overlabFilter = chattingTextList.filter(obj => {
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
                            msg: data.msg,
                            percent: data.percent
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
        // 체크박스에 체크된 애들만 넣기위해서 아래 로직 진행
        let tempWinnerList = [...winnerList]
        const arrCheckbox = document.getElementsByName('twoHeart_checkbox')

        for (let i = arrCheckbox.length - 1; i >= 0; i--) {
            if (arrCheckbox[i].checked === false) {
                tempWinnerList.splice(i, 1);
            }
        }

        let tempAddList = [...tempWinnerList];
        let copyIDList = '';

        console.log(tempAddList)
        console.log(winnerList)

        if (tempAddList.length > 0) {
            for (const i in tempAddList) {
                copyIDList += tempAddList[i].id + '\n'
            }
            const t = document.createElement("textarea");
            document.body.appendChild(t);
            t.value = copyIDList;
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);

            alert('복사되었습니다.')
        }
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
        <div id="twoHeart">
            <div className="top_menu">
                <label>검색어: </label>
                <input type='text' onChange={onChangeSearchText} placeholder='검색어1' />

                <label>중복 표시</label>
                <input type="checkbox" defaultChecked="true" onChange={onChangeOverlabCheckbox} ref={overlabRemoveCheckboxRef} />
            </div>

            <div className="content">
            <div className="content_box chatting">
                    <div className="twitch_chatting_box">
                        <img src={logo_twitch} className={'logo logo_twitch'} alt="" />
                        <label>Twitch Chatting</label>
                        <textarea onChange={onChangeTextArea} ref={twitchTextAreaRef} />
                    </div>

                    <div className="youtube_chatting_box">
                        <img src={logo_youtube} className={'logo logo_youtube'} alt="" />
                        <label>Youtube Chatting</label>
                        <textarea onChange={onChangeTextArea} ref={youtubeTextAreaRef} />
                    </div>
                </div>

                <div className="content_box applicant">
                    <div className="applicant_banner">
                        <h2>전체 채팅</h2>
                        {/* <button onClick={onClickWinnerListCopy}>ID 복사</button> */}
                    </div>
                    {
                        chattingTextList.map((data, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <div className="applicant_box">
                                        <img src={data.platform === 'twitch' ? logo_twitch : logo_youtube} className='logo' alt="" />
                                        <label className="applicant_id">{data.id}</label>
                                        <label className="applicant_msg">{data.msg}</label>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>

                <div className="content_box result">
                    <div className="result_banner">
                        <h2>일치율</h2>
                        <button onClick={onClickWinnerListCopy}>ID 복사</button>
                    </div>
                    {
                        winnerList.map((data, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <div className="winner_box" style={ data.platform === 'overlab' ? {backgroundColor:'red'} : {}}>
                                        <input type='checkbox' id={'twoHeart_check_' + idx} name="twoHeart_checkbox" />
                                        <img src={data.platform === 'twitch' ? logo_twitch : data.platform === 'youtube' ? logo_youtube : logo_x} className='logo' alt="" />
                                        <label className="winner_id">{data.id}</label>
                                        <label className="winner_msg">{data.msg}</label>
                                        <label className="winner_msg">{data.percent} %</label>
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
