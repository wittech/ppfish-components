import React from 'react'

import { Provider } from './Context';
import { getLocale } from './Consumer';

let runtimeLocale: {
  locale?: string,
} = {};

export function getRuntimeLocale(componentName) {
  if (!runtimeLocale.locale) {
    // 获取默认Locale;
    changeRuntimeLocale();
  }
  return runtimeLocale[componentName] || {};
}

// 部分组件如Modal 可以通过函数式调用  所以需要runtimeLocale提供支撑
export function changeRuntimeLocale(LocaleValue = 'zh_CN') {
  runtimeLocale = getLocale(LocaleValue);
};

export default (props: {
  value: {
    Locale: string,
  }
  children?: React.ReactNode
}) => {
  const renderProvider = () => {
    changeRuntimeLocale(props.value && props.value.Locale);
    return props.children
  }
  return <Provider value={props.value}>
    {
      renderProvider()
    }
  </Provider>
};