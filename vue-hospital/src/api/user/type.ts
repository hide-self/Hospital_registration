export interface ResponseData {
    "code": number,
    "message": string,
    "ok": boolean
}
//提交订单接口返回的数据的ts类型
export interface SubmitOrder extends ResponseData {
    data: number
}

//订单详情数据的ts类型
export interface OrderInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

//定义订单接口返回的数据ts类型
export interface OrderResponseData extends ResponseData {
    data: OrderInfo
}


//获取二维码接口返回的数据ts类型
export interface PayInfo {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string
}

export interface QrCode extends ResponseData {
    data: PayInfo
}

//查询支付结果的ts数据类型
export interface PayReslt extends ResponseData {
    data: boolean
}

//代表一个用户信息的数据类型
export interface UserInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
    },
    "openid": null,
    "nickName": null,
    "phone": string,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "certificatesUrl": null,
    "authStatus": number,
    "status": number
}

//获取用户信息接口返回的数据的ts类型
export interface UseringoResponseData extends ResponseData {
    data: UserInfo
}
