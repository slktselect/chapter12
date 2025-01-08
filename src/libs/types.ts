/**
 * 将日期类型转换为字符串类型
 */
export type DateToString<T> = {
    [K in keyof T]: T[K] extends Date ? string : T[K];
};

/**
 * 应用配置
 */
export interface AppConfig {
    baseUrl: string;
    apiURL: string;
}
