import React, {useState, useMemo, useEffect, memo, useCallback} from 'react'

import PropTypes from 'prop-types'
import classnames from 'classnames'
//样式
import './SearchSelector.less'

const CityItem = memo(function CityItem(props) {
    //城市的名字，点击事件
    const {name, onSelect} = props
    return (
        <li className={"city-li"} onClick={() => onSelect(name)}>
            {name}
        </li>
    )
})

CityItem.prototype = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

const CitySection = memo(function CitySection(props) {
    const {title, cities = [], onSelect} = props
    return (
        <ul className={"city-ul"}>
            <li className={"city-li"} key={title} data-cate={title}>
                {title}
            </li>
            {cities.map((i) => {
                return <CityItem key={i.name} name={i.name} onSelect={onSelect}/>
            })}
        </ul>
    )
})

CitySection.prototype = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}


const AlphaIndex = memo(function AlphaIndex(props) {
    const {
        alpha,
        onClick
    } = props

    return (
        <i className={"city-index-item"} onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    )
})


AlphaIndex.prototype = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const Alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index)
})


const CityList = memo(function CityList(props) {
    const {sections, toAlpha, onSelect} = props
    return (
        <div className={"city-list"}>
            <div className={"city-cate"}>
                {sections.map(i => {
                    return (
                        <CitySection key={i.title} title={i.title} cities={i.citys} onSelect={onSelect}/>
                    )
                })}
            </div>
            <div className={"city-index"}>
                {
                    Alphabet.map((i) => {
                        return <AlphaIndex key={i} alpha={i} onClick={toAlpha}/>
                    })
                }
            </div>
        </div>
    )
})

CityList.prototype = {
    sections: PropTypes.array.isRequired,
    toAlpha: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
}


const SuggestItem = memo(function SuggestItem(props) {
    const {name, onClick} = props
    return (
        <li className={"city-suggest-li"} onClick={() => onClick(name)}>
            {name}
        </li>
    )
})

SuggestItem.prototype = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}


const Suggest = memo(function Suggest(props) {
    const {
        searchKey,
        onSelect,
    } = props;

    const [result, setResult] = useState([]);

    useEffect(() => {
        fetch('/rest/search?key=' + encodeURIComponent(searchKey))
            .then(res => res.json())
            .then(data => {
                const {
                    result,
                    searchKey: sKey,
                } = data;

                if (sKey === searchKey) {
                    setResult(result);
                }
            });
    }, [searchKey]);

    const fallBackResult = useMemo(() => {
        if (!result.length) {
            return [{
                display: searchKey,
            }];
        }

        return result;
    }, [result, searchKey]);

    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    fallBackResult.map(item => {
                        return (
                            <SuggestItem
                                key={item.display}
                                name={item.display}
                                onClick={onSelect}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
});

Suggest.prototype = {
    searchKey: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const SearchSelector = memo(function SearchSelector(props) {
    const {show, cityData, isLoading, onBack, fetchCityData, onSelect} = props
    const [searchKey, setSearchKey] = useState("")

    const key = useMemo(() => {
        return searchKey.trim()
    }, [searchKey])

    //获取数据是副作用，并不需要每次渲染之后 都要调用这个函数，然而并不是 只有当show等于真的时候 或者 cityData有值 或者  isLoading 为真(正在发起网络请求)
    useEffect(() => {
        if (!show || isLoading) {
            return;
        }
        // fetchCityData();
    }, [show, isLoading])


    const toAlpha = useCallback(alpha => {
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
    }, [])


    //处理报错
    const outputCitySections = () => {
        //如果当前正在请求
        if (isLoading) {
            return <div>loading</div>
        }

        if (typeof (cityData.cityList) != "undefined") {
            return (
                <CityList
                    sections={cityData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                />
            )
        }

        return <div>error</div>
    }

    return (
        <div className={classnames('city-selector', {hidden: !show})}>
            <div className={"city-search"}>
                <div className={"search-back"} onClick={() => onBack()}>
                    <svg width={"42"} height={"42"}>
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#000"
                            strokeWidth="1"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className={"search-input-wrapper"}>
                    <input
                        type="text"
                        value={searchKey}
                        className={"search-input"}
                        placeholder={"城市、车站的中文或拼音"}
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <div>
                    <i className={classnames("search-clean", {hidden: key.length === 0})}
                       onClick={() => setSearchKey("")}>
                        &#xf063;
                    </i>
                </div>
            </div>
            {
                Boolean(key) && (
                    <Suggest
                        searchKey={key}
                        onSelect={key => onSelect(key)}
                    />
                )
            }
            {/*{outputCitySections()}*/}
        </div>
    )
})

SearchSelector.prototype = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.Object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func,
    fetchCityData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default SearchSelector