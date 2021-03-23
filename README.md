# receipt_management_backend

## 發票管理系統-後端功能

(前端功能請連結[此處](https://github.com/LiDingYu0510/receipt_management_frontend))

### 功能簡介

```
使用者登入部分，利用JW做登入的確認；
資料庫使用postgreSQL
```

### API 管理

| API                    | Function                  |
| ---------------------- | ------------------------- |
| /api/v1/receipt/getAll | 獲取該會員所有發票        |
| /api/v1/receipt/post   | 新增發票                  |
| /api/v1/receipt/update | 更新發票                  |
| /api/v1/receipt/delete | 刪除發票                  |
| /api/v1/user/register  | 會員註冊                  |
| /api/v1/user/login     | 會員登入                  |
| /api/v1/user/authority | 中間件 endpoint，確認會員 |
