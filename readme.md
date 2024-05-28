API基本路由設計:
1. 單一回傳值,延伸實做基本的緩存加速
2. 多個回傳值,延伸實做基本的分頁減少回傳量
3. 帶驗證單一回傳,增設假設的中間鍵(虛擬碼)

---

#其他事項

1. 關於token需要手動修改的原因
  -> ciUgGpuDEuJqi-jPd_5Yr

  猜測搜尋時, 需要透過後台拿到一組有效的token才能去CMS拿資料, 不然在graphQL那一層會拿不到部落格的文章


1. 關於使用hyper-express, 並且不使用http3/http2的原因
  http2不支援的原因 https://github.com/uNetworking/uWebSockets.js/discussions/178
	http2所使用的frame跟stream對於一般的http請求不一定會有幫助, 如果是在訊號不好的時候(參照rfc) https://datatracker.ietf.org/doc/html/rfc9113#section-5-2.1


3. 關於減少回傳量
  如果有資料有排序並且呼叫的API沒有提供排序功能, 則必須在這一層考慮所有的資料與排序, 鑑於情境可能過於複雜不過度實做

4. 關於錯誤的設計
  錯誤編碼:
    本專案為: APICode(三碼) + functionCode(三碼)
    更龐大專案的話會再更細分成:  SessionId + APICode(三碼) + functionCode(三碼) + commonErrorCode(三碼) + 時戳
  錯誤訊息:
    在假設這個系統是給前端界接的情況(不是內部使用),
    只有沒有被catch到的錯誤才會回傳出最完整的資訊, 但這個操作在正式站上面也會關閉, 轉而將錯誤訊息拋到log-service

