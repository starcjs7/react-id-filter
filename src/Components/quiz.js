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
            msg: data.substring(data.indexOf(':') + 1, data.length).trim(),
            overlab: false
        }
        return json;
    });
    return arrResult;
}

const IdFilter = () => {
    const overlabRemoveCheckboxRef = useRef();
    const twitchTextAreaRef = useRef();
    const youtubeTextAreaRef = useRef();
    const pointRef = useRef();

    const [history, setHistory] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [overlabChecked, setOverlabChecked] = useState(true);

    const [chattingTextList, setChattingTextList] = useState([]);
    const [winnerList, setWinnerList] = useState([]);

    const [finalWinnerList, setFinalWinnerList] = useState([]);

    useEffect(() => {
        let tempArr = []
        // 검색어들만 tempArr에 push
        const searchArr = searchText.split(',');
        for (const i in chattingTextList) {
            const arr = chattingTextList[i];
            const msg = chattingTextList[i].msg;
            // 검색에서 공백은 Pass
            if (searchText !== '') {
                // 검색어 구분 ','로 하고 배열을 돌음
                for (const i in searchArr) {
                    const searchItem = searchArr[i];
                    // 검색어 사이 공백은 pass
                    if (searchItem !== '') {
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
                            platform: data.platform,
                            id: data.id,
                            msg: data.msg,
                            overlab: true
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

    const onClickAddWinner = () => {
        const value = pointRef.current.value;

        let tempFinalList = [...finalWinnerList]

        // 체크박스에 체크된 애들만 넣기위해서 아래 로직 진행
        let tempWinnerList = [...winnerList]
        const arrCheckbox = document.getElementsByName('checkbox')
        for (let i = arrCheckbox.length - 1; i >= 0; i--) {
            if (arrCheckbox[i].checked === false) {
                tempWinnerList.splice(i, 1);
            }
        }

        let tempAddList = [...tempWinnerList];
        let tempHistoryList = [...tempWinnerList];

        // 기존 값 있으면 점수 더하기
        for (let i = tempFinalList.length - 1; i >= 0; i--) {
            const item = tempFinalList[i];

            for (let j = tempAddList.length - 1; j >= 0; j--) {
                const jtem = tempAddList[j];
                if (item.id === jtem.id) {
                    tempFinalList[i] = {
                        id: item.id,
                        platform: item.platform,

                        point: (parseInt(item.point) + parseInt(value))
                    }
                    tempAddList.splice(j, 1);
                }
            }
        }

        // 새로운 멤버들 추가
        const arr = tempAddList.map((data) => {
            const item = { platform: data.platform, id: data.id, point: parseInt(value) }
            return item;
        })
        tempFinalList = [...tempFinalList, ...arr];

        // Rank 별로 Order by 정렬
        tempFinalList.sort((a, b) => {
            if (a.point < b.point)
                return 1;
            if (a.point > b.point)
                return -1;
            return 0;
        });

        if(tempHistoryList.length > 0){
            setHistory(prev => [...prev, { data: tempHistoryList }])
        }

        setFinalWinnerList(tempFinalList);
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
        <div id="quiz">
            <div className="top_menu">
                <label>정답: </label>
                <input type='text' onChange={onChangeSearchText} />

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

                <div className="content_box board">
                    <div className="content_box board_box">
                        <div className="content_box result">
                            <div className="result_banner">
                                <h2>정답자 {winnerList.length}명</h2>
                            </div>
                            {
                                winnerList.map((data, idx) => {
                                    return (
                                        <Fragment key={idx}>
                                            <div className="winner_box" style={data.overlab === true ? { backgroundColor: 'red' } : {}}>
                                                <input type='checkbox' id={'check_' + idx} name="checkbox" defaultChecked="true" />
                                                <img src={data.platform === 'twitch' ? logo_twitch : data.platform === 'youtube' ? logo_youtube : logo_x} className="logo" alt="" />
                                                <label className="winner_id" htmlFor={'check_' + idx}>{data.id}</label>
                                                <label className="winner_msg" htmlFor={'check_' + idx}>{data.msg}</label>
                                            </div>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>

                        <div className="content_box option">
                            <label>추가할 점수</label>
                            <input type="number" className="point" defaultValue={1} maxLength={2} ref={pointRef} />
                            <button onClick={onClickAddWinner}>〉</button>
                        </div>

                        <div className="content_box final">
                            <div className="final_banner">
                                <h2>최종 점수판</h2>
                                {/* <button onClick={onClickWinnerListCopy}>ID 복사</button> */}
                            </div>
                            {
                                finalWinnerList.map((data, idx) => {
                                    return (
                                        <Fragment key={idx}>
                                            <div className="winner_box">
                                                <img src={data.platform === 'twitch' ? logo_twitch : logo_youtube} className="logo" alt="" />
                                                <label className="winner_id">{data.id}</label>
                                                <label className="winner_msg">{data.point}</label>
                                            </div>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='content_box history'>
                        <h2>history</h2>
                            {
                                history.map((data, idx) => {
                                    const idTagList = data.data.map((item) => {
                                        return(
                                            <label className='history_id'>{item.id}</label>
                                        )
                                    })

                                    return(
                                        <div className='history_box'>
                                            <p>{idx + 1}번째 정답자</p>
                                            {idTagList}
                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default IdFilter;
