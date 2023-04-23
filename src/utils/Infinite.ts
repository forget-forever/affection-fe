import { showMaskToast } from "./utils";

type IParams = {
  current: number;
  pageSize: number;
};

type IPageBaseMsg = Record<'current' | 'pageSize' | 'total' | 'totalPage', number>;
// 列表页的类型
export interface IPageList<T extends any> extends IPageBaseMsg {
  list: T[];
}
export default class Infinite<P, T> {
  request: (params: P & IParams) => Promise<IPageList<T>>;
  private params: P & IParams;
  private loading: boolean;
  private finish: boolean;
  private status: 'pedding' | 'destory';
  /**
   * 是否要开启加载警告，比如说到底了会出弹窗警告
   * @default true
   */
  showLoadingWarn: boolean;
  private watLoad?: (arg: boolean) => void;

  /**
   * 无限滚动数据集中处理的对象
   * @param params 初始的时候的参数，类型跟传入的第一个泛型一致
   * @param request 请求的函数，类似于 (params) => request('...', { params })
   * @param watchLoad 是否要监听加载的变化，要的话把回调函数穿进来
   * @param pageSize 一页的条数，默认是一页20条
   */
  constructor(
    params: P,
    request: (reParams: P & IParams) => Promise<IPageList<T>>,
    watchLoad?: (arg: boolean) => void,
    pageSize: number = 20,
  ) {
    this.request = request;
    this.params = { ...params, current: 1, pageSize };
    this.showLoadingWarn = true;
    this.loading = false;
    this.finish = false;
    this.status = 'pedding';
    this.watLoad = watchLoad;
  }
  /**
   * 获取下一页的数据
   * @param params 发起请求的参数，类型跟传入的第一个泛型一致，可选参数，如果不传会使用上次请求传过来的并且成功请求到数据的
   * @param refresh 是否是重新初始化，置为true之后请求的页数会变成1，相当于重新加载
   * @returns 获取到的数据，如果是error，则message有可能有loading、finished、onTop、destroyed四种状态，以及接口的报错
   */
   next(params?: P, refresh?: boolean) {
    let { current } = this.params;
    if (current > 1 && this.finish) {
      if (this.showLoadingWarn) showMaskToast('已加载完');
      return Promise.reject(new Error('finished'));
    }
    current += 1;
    if (refresh) current = 1;
    return this.getData({...this.params, ...params, current});
  }
  /**
   * 获取上一页的数据
   * @param params 发起请求的参数，类型跟传入的第一个泛型一致，可选参数，如果不传会使用上次请求传过来的并且成功请求到数据的
   * @param refresh 是否是重新初始化，置为true之后请求的页数会变成1，相当于重新加载
   * @returns 获取到的数据, 如果是error，则message有可能有loading、finished、onTop、destroyed四种状态，以及接口的报错
   */
  pre(params?: P, refresh?: boolean) {
    let { current } = this.params;
    if (current === 1) {
      if (this.showLoadingWarn) showMaskToast('已到头部');
      return Promise.reject(new Error('onTop'));
    }
    current -= 1;
    if (refresh) current = 1;
    return this.getData({...this.params, ...params, current});
  }
  /**
   * 重新加载
   * @param params 发起请求的参数，类型跟传入的第一个泛型一致，可选参数，如果不传会使用上次请求传过来的并且成功请求到数据的
   * @returns 获取到的数据，如果是error，则message有可能有loading、finished、onTop、destroyed四种状态，以及接口的报错
   */
  refresh(params: P = this.params) {
    this.finish = false;
    return this.next(params, true);
  }
  /**
   * 设置参数，可以通过这个方法，修改指定的参数
   * @param params 所要修改的参数字段
   */
  setParams(params: Partial<P>) {
    const oldParams = { ...this.params };
    this.params = { ...oldParams, ...params };
  }
  /**
   * 销毁对象，防止组件销毁后，数据请求出来无处渲染
   */
  destory() {
    this.status = 'destory';
  }

  private setLoading(sig: boolean) {
    if (sig === this.loading) return;
    if (this.watLoad) {
      this.watLoad(sig);
    }
    this.loading = sig;
  }

  private async getData(params: P & IParams) {
    if (this.loading) {
      if (this.showLoadingWarn) showMaskToast('加载中');
      return Promise.reject(new Error('loading'));
    }
    this.setLoading(true);
    try {
      const { pageSize, current } = this.params;
      const res = await this.request({ ...params, current, pageSize });
      this.setLoading(false);
      if (res.list.length < pageSize) {
        this.finish = true;
      } else {
        this.finish = false;
      }
      if (this.status === 'destory') return Promise.reject(new Error('destroyed'));
      this.params = { ...params, current, pageSize };
      return res;
    } catch (error) {
      this.setLoading(false);
      return Promise.reject(error);
    }
  }
}
