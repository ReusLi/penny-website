import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import Table from 'components/table/table'
import tableConst from './const.tsx'

Enzyme.configure({ adapter: new Adapter() });

let tableComponent
try {
    tableComponent = shallow(<Table cellModels={tableConst.tabelProps.cellModels}/>).instance()
} catch (e) {
    console.log(e)
    console.error('渲染Table组件出错')
}
 
describe('table组件', () => {
    describe('测试正确渲染x行y列', () => {
        it('initTableHeader方法', () => {
            // 如果console.log关于tableComponent, cellList的信息
            // 就会报错: 
            // TypeError: Cannot convert a Symbol value to a string
            // 这里应该写成 console.log(JSON.stringify(cellList)) 的形式

            const cellList = tableComponent.initTableHeader(tableConst.tabelProps.cellModels)
            expect(cellList.length).to.be.equal(4)
        })
    })
})