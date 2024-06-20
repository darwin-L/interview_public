API基本路由設計:
1. 單一回傳值,延伸實做基本的緩存加速
2. 多個回傳值,延伸實做基本的分頁減少回傳量
3. 帶驗證單一回傳,增設假設的中間鍵(虛擬碼)

---

#其他事項

1. 如果是法源搜尋的話token需要手動修改, 所以改查詢lawyers
  -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJpZCI6IjY1ZDMwM2Q3NWRlM2M4MzM4YTRmNDNkYSIsInJvbGUiOiJtZW1iZXIiLCJwcm92aWRlciI6Imdvb2dsZSIsInJlYWNoRGV2aW  NlTGltaXRBdCI6IjIwMjQtMDItMTlUMTA6MDM6NTMuOTIxWiIsImlhdCI6MTcwODMzNzM0OSwiZXhwIjoxNzIzODg5MzQ5fQ. Gj4VdEc3GSV30t9B47EHqWUsr39607hUzQKNorrlKoY

  猜測搜尋時,可能的驗證中間件(auth-middleware)的寫法為
  帳號登入 -> 獲取hash_token -> 打/2/auth/validate_token  確認同時連線裝置/hash_token是否有效/其他商業邏輯 ->   socket連線 -> 確認導流的搜尋資料庫 ->透過socket 將validate_token的value(uid)拿去獲得查詢token ->  拿socket給的  驗證資訊進行查詢 -> 顯示結果

  token分析與假設 
  1. "."前面是帳號/密碼/deviceId的hash, 後面是連線的token, 所以不是固定token, 因為API要計次, 沒有辦法拿到token之  後拿來進行面試專案的測試
  2. 用無痕登入的連線並沒有帶token, 但在40request左右會被擋住, 並且大約10分鐘後可以再次查詢(但如果被檔第一次之後會是  不同程度的延遲懲罰),猜測是看連線的IP

2. 關於使用hyper-express, 並且不使用http3/http2的原因
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

