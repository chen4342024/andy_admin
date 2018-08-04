import request from '@/utils/request'

const HOST = process.env.BASE_API

// ?url=https://detail.1688.com/offer/570590637979.html?spm=a2604.8117111.ji00a0ac.1.a0393ea7MRj5qB&name=second

/**
 * 获取列表
 * @param {} data
 */
export function fetch(params) {
    return request({
        url: HOST + '/api/v1/spider/fetch',
        method: 'get',
        params
    })
}

export function getDownloadUrl(zipUrl) {
    return `${HOST}${zipUrl}`
}
