import { expect } from 'chai'

import util from 'store/matrix/util'

describe('Matrix store util 工具类', () => {

    describe('buildMatrixModel 构建n*n矩阵', () => {
        it('构建 7 * 2 矩阵', () => {
            const COL = 10,
                  ROW = 2;

            const cellModels = util.buildMatrixModel(COL, ROW)
            
            expect(cellModels.length).to.be.equal(COL)
            
            cellModels.forEach(row => {
                expect(row.length).to.be.equal(ROW)
            })
        })

        it('构建 3 * 6 矩阵', () => {
            const COL = 3,
                  ROW = 6;

            const cellModels = util.buildMatrixModel(COL, ROW)
            
            expect(cellModels.length).to.be.equal(COL)
            
            cellModels.forEach(row => {
                expect(row.length).to.be.equal(ROW)
            })
        })

        it('构建 0 * 0 矩阵', () => {
            const COL = 0,
                  ROW = 0;

            const cellModels = util.buildMatrixModel(COL, ROW)
            
            expect(cellModels.length).to.be.equal(COL)
            
            cellModels.forEach(row => {
                expect(row.length).to.be.equal(ROW)
            })
        })

        it('构建 10 * 10 矩阵', () => {
            const COL = 10,
                  ROW = 10;

            const cellModels = util.buildMatrixModel(COL, ROW)
            
            expect(cellModels.length).to.be.equal(COL)
            
            cellModels.forEach(row => {
                expect(row.length).to.be.equal(ROW)
            })
        })
    })
})