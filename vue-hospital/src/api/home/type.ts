// 定义首页模块ts数据类型

export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

// 代表一个已有的医院数据的ts类型
export interface Hospital{
    "id":string,
    "createTime":string,
    "updateTime":string,
    "param":{
        "hostypeString":string,
        "fullAddress":string
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": string,
    "route": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    }
}

// 存储已有全部医院的数组类型
export type Content=Hospital[];


// 获取已有医院接口返回的数据的ts类型
export interface HospitalResponseData extends ResponseData{
    // 继承之后，拥有ResonseData的三个类型之外，还有data这个类型
    data:{
        content:Content,
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean
    }
}