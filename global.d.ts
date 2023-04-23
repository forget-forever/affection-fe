declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

declare interface ObjectConstructor {
  entries<T>(o: T): [keyof T, T[keyof T]][];
  keys<T extends object>(o: T): (keyof T)[];
}

/**
 * 获取类型中的值的联合类型
 */
declare type ValueOf<T> = T extends { [K in keyof T]: infer V } ? V : never;

/**
 * 获取一个函数中除第一个参数外的其他参数
 */
declare type OtherParameters<T extends (...args: any) => any> = T extends (f: any, ...args: infer P) => any ? P : never;

/**
 * 自定义的Omit，排除一个类型中的某个属性
 */
declare type MyOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * 获取函数组件的props类型
 */
declare type GetIProps<T> = T extends React.FC<infer P> ? P : never;

 /**
  * 获取class组件的props类型
  */
declare type GetClassIprops<T extends abstract new (...args: any) => any> = ConstructorParameters<T>[0];

/**
 * options选型的类型
 */
declare type IOptions<V = string | number, L = string> = {
  value: V;
  label: L;
}

type IKey = string | number
type IValue = IKey | boolean | object | undefined | null | object
/**
 * 对象的通用类型
 */
declare type IDataObject = Record<IKey, IValue>

/**
 * 转小驼峰
 */
declare type ISmallCamel<T extends IDataObject> = {
  [K in keyof T as Uncapitalize<K>]: T[K] extends object ? ISmallCamel<T[K]> : T[K]
}

/**
 * 转大驼峰
 */
declare type IBigCamel<T extends IDataObject> = {
  [K in keyof T as Capitalize<K>]: T[K] extends object ? IBigCamel<T[K]> : T[K]
}

// type T1 = [{
//   aBfafrV: number;
//   afdsaG: {
//     AaBfafrV: number;
//     srgvA: string;
//     AfgtF: boolean
//   }[]
//   afgtF: boolean
// }]
// type T2 = IBigCamel<T1>

// const aa: T2 = [{
//   AfdsaG: [{
//     a
//   }]
// }]

declare type IDateTime = `/Date(${number})/`

// 取promise中的类型
declare type PromiseData<D> = D extends Promise<infer R> ? R : never 

// 取返回值是Promise中的值
declare type PromiseReturn<F> = ReturnType<F> extends Promise<infer R> ? R : never 

declare type OtherParameters<T extends (...args: any) => any> = T extends (f: any, ...args: infer P) => any ? P : never;

declare namespace wx {
  declare namespace miniProgram {
    type navigateTo = typeof Taro.navigateTo
  }
}

declare type ITabBar = {
  color: string;
  selectedColor: string;
  backgroundColor: string;
  list: {
    selectedIconPath: string;
    selectedIconUrl: string;
    iconPath: string;
    iconUrl: string;
    pagePath: string;
    text: string;
  }[];
}
