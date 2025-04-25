// 引入二次封装的axios
import request from "@/utils/request";

// 引入ts
import type { OrderResponseData, SubmitOrder,QrCode,PayReslt, UseringoResponseData,CertationTypeResponseData,UserParams } from "./type";

// 枚举地址
enum API {
    // 提交订单并获取订单号的接口
    SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',

    // 获取订单详情的数据
    GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',

    // 取消订单的接口
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',

    //获取支付订单二维码接口
    QRCODE_URL = '/order/weixin/createNative/',

    //查询订单支付的结果
    PAYRESULT_URL = '/order/weixin/queryPayStatus/',

    // 获取当前账号用户实名情况
    USERINFO_URL='/user/auth/getUserInfo',

    // 获取证件类型的接口
    CERTIFICATIONTYPE_URL='/cmn/dict/findByDictCode/',

    //用户认证的结构
    USERCERTATION_URL = '/user/auth/userAuah',

}

// 提交订单(提交医院ID、医生ID、就诊人ID)
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`);

// 获取订单详情的方法
export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id)

// 取消订单
export const reqCancelOrder = (id: string) => request.get<any, any>(API.ORDERCANCEL_URL + id)

//获取支付二维码接口
export const reqQrcode = (orderId: string) => request.get<any, QrCode>(API.QRCODE_URL + orderId);

//查询订单支付的结果
export const reqQueryPayState = (orderId: string) => request.get<any, PayReslt>(API.PAYRESULT_URL + orderId);

//获取当前用户信息的接口
export const reqUserInfo = () => request.get<any, UseringoResponseData>(API.USERINFO_URL);

//获取证件类型的方法
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType);

//用户认证接口
export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL, data);


