import { expect } from 'chai'

import { cellStyleJudge } from 'components/cell/cellStyleJudge'

let cellStyleJudgeCls = new cellStyleJudge()

describe('cellStyleJudge类', () => {
    let props = {
        selectInfo: {
            startCell: {
                X: 0,
                Y: 0
            },
            endCell: {
                X: 7,
                Y: 7
            }
        },
        cellKey: {
            X: 0,
            Y: 0
        }
    }
    describe('判断cell是否处于边界', () => {

        it('isTop边界', () => {
            props.cellKey.X = 0

            let className = cellStyleJudgeCls.isTop([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-top');
        })

        it('isRight边界', () => {
            props.cellKey.Y = 7

            let className = cellStyleJudgeCls.isRight([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-right');
        })

        it('isBottom边界', () => {
            props.cellKey.X = 7

            let className = cellStyleJudgeCls.isBottom([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-bottom');
        })

        it('isLeft边界', () => {
            props.cellKey.Y = 0

            let className = cellStyleJudgeCls.isLeft([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-left');
        })

    })
})