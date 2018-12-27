import * as React from 'react'

/** 
 * onDataTypeChange来自 父组件方法
 * 
 * 当子组件属性数据变动时, 调用 onDataTypeChange 方法
 * 
 * 更新父组件里的关于 editor 的数据
 */
export let MatrixContext = React.createContext({
    onCellMouseDown: () => { },
    onCellMouseUp: () => { }
});