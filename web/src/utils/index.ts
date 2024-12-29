// 拼接请求查询语句
export const parseQuery = (obj: Record<string, unknown>) => {
    let str = '';
    for (const key in obj) {
        const value =
            typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
        str += '&' + key + '=' + value;
    }
    return str.slice(1);
}
