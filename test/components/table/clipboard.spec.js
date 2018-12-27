import { expect } from 'chai'

import clipboard from 'components/table/clipboard'

describe('clipboard 剪切板工具类', () => {
    describe('filterPasteData 方法正确过滤出n*n矩阵', () => {
        const CONST = {
            RESULT_LEN: 2,
            ITEM_LEN: 3
        }

        it('paste场景1', () => {
            const paste1 = [
                ['1', '2', '3'],
                ['4', '5', '6']
            ]

            const result = clipboard.filterPasteData(paste1)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景2', () => {
            const paste2 = [
                ['1', '2', '3', ''],
                ['4', '5', '6']
            ]

            const result = clipboard.filterPasteData(paste2)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景3', () => {
            const paste3 = [
                ['1', '2', '3'],
                ['4', '5', '6', '']
            ]

            const result = clipboard.filterPasteData(paste3)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景4', () => {
            const paste4 = [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['']
            ]

            const result = clipboard.filterPasteData(paste4)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景5', () => {
            const paste5 = [
                ['1', '2', '3', ''],
                ['4', '5', '6'],
                ['']
            ]

            const result = clipboard.filterPasteData(paste5)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景6', () => {
            const paste6 = [
                ['1', '2', '3'],
                ['4', '5', '6', ''],
                ['']
            ]

            const result = clipboard.filterPasteData(paste6)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景7', () => {
            const paste7 = [
                ['1', '2', '3', ''],
                ['4', '5', '6', ''],
                ['']
            ]

            const result = clipboard.filterPasteData(paste7)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })
    })

    describe('getPasteData 方法正确拿到剪切板的值', () => {
        it('paste数据结构1', () => {
            const pasteStr1 =
                `1	2	3
                        4	5`

            /**
             * result应该等于:
             *  [
             *      ['1', '2', '3']
             *      ['', '4', '5']
             *  ]
             */
            const result = clipboard.getPasteData(pasteStr1)

            expect(result.length).to.be.equal(2)

            expect(result[0][0]).to.be.equal('1')
            expect(result[0][1]).to.be.equal('2')
            expect(result[0][2]).to.be.equal('3')

            expect(result[1][0]).to.be.equal('')
            expect(result[1][1]).to.be.equal('4')
            expect(result[1][2]).to.be.equal('5')
        })
    })

    describe('makeMatrix 方法正确构建矩阵的cellModels', () => {
        const checkAttr = (cell) => {
            return cell.X !== undefined
                && cell.Y !== undefined
                && cell.colSpan !== undefined
                && cell.rowSpan !== undefined
                && cell.text !== undefined
                && cell.isHide !== undefined
        }

        it('构建场景1', () => {
            const pasteData1 = [
                ['1', '2'],
                ['3', '4']
            ]

            const result = clipboard.makeMatrix(pasteData1)

            // 检查属性是否齐全
            expect(checkAttr(result[0][0])).to.be.equal(true)
            expect(checkAttr(result[0][1])).to.be.equal(true)
            expect(checkAttr(result[1][0])).to.be.equal(true)
            expect(checkAttr(result[1][1])).to.be.equal(true)

            // 检查建构后是不是还是 2*2的矩阵
            expect(result.length).to.be.equal(2)
            expect(result[0].length).to.be.equal(2)
            expect(result[1].length).to.be.equal(2)
        })

        it('构建场景2', () => {
            const pasteData2 = [
                ['', '2'],
                ['3', '']
            ]

            const result = clipboard.makeMatrix(pasteData2)

            // 检查属性是否齐全
            expect(checkAttr(result[0][0])).to.be.equal(true)
            expect(checkAttr(result[0][1])).to.be.equal(true)
            expect(checkAttr(result[1][0])).to.be.equal(true)
            expect(checkAttr(result[1][1])).to.be.equal(true)

            // 检查isHide属性有没有正确设置
            expect(result[0][0].isHide).to.be.equal(true)
            expect(result[0][1].isHide).to.be.equal(false)
            expect(result[1][0].isHide).to.be.equal(false)
            expect(result[1][1].isHide).to.be.equal(true)

            // 检查建构后是不是还是 2*2的矩阵
            expect(result.length).to.be.equal(2)
            expect(result[0].length).to.be.equal(2)
            expect(result[1].length).to.be.equal(2)
        })
    })

    describe('resetSpan方法, 根据paste的""值, 正确设置colSpan, rowSpan', () => {
        const CONST = {
            SPAN_ONE: 1,
            SPAN__TWO: 2,
            SPAN___THREE: 3
        }
        it('resetSpan场景1', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, colSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 2, rowSpan: 1, colSpan: 1, isHide: true }
                ]
            ]

            cellModels = clipboard.resetSpan(cellModels)

            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.SPAN__TWO)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.SPAN_ONE)
        })

        it('resetSpan场景2', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, colSpan: 1, isHide: true },
                    { X: 0, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, colSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 2, rowSpan: 1, colSpan: 1, isHide: false }
                ]
            ]

            cellModels = clipboard.resetSpan(cellModels)

            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.SPAN_ONE)
        })

        it('resetSpan场景3', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, colSpan: 1, isHide: true }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 2, rowSpan: 1, colSpan: 1, isHide: true }
                ]
            ]

            cellModels = clipboard.resetSpan(cellModels)

            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.SPAN__TWO)

            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.SPAN__TWO)

            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.SPAN_ONE)
        })

        it('resetSpan场景4', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, colSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 2, rowSpan: 1, colSpan: 1, isHide: true }
                ],
                [
                    { X: 2, Y: 0, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 2, Y: 1, rowSpan: 1, colSpan: 1, isHide: false },
                    { X: 2, Y: 2, rowSpan: 1, colSpan: 1, isHide: true }
                ]
            ]

            cellModels = clipboard.resetSpan(cellModels)

            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.SPAN___THREE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[2][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[2][2].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[2][0].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[2][0].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[2][1].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[2][1].colSpan).to.be.equal(CONST.SPAN_ONE)

            expect(cellModels[2][2].rowSpan).to.be.equal(CONST.SPAN_ONE)
            expect(cellModels[2][2].colSpan).to.be.equal(CONST.SPAN_ONE)
        })
    })

    describe('setColSpan 找到左侧距离最近的isHide = false的cell, 并使cell.colSpan + 1', () => {
        const CONST = {
            COL_SPAN_ONE: 1,
            COL_SPAN__TWO: 2,
            COL_SPAN___THREE: 3
        }

        it('setColSpan场景1', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, colSpan: 1, isHide: false },
                    { X: 0, Y: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, colSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 2, colSpan: 1, isHide: true }
                ]
            ]

            clipboard.setColSpan(cellModels, cellModels[0][0])
            clipboard.setColSpan(cellModels, cellModels[0][1])
            clipboard.setColSpan(cellModels, cellModels[0][2])

            clipboard.setColSpan(cellModels, cellModels[1][0])
            clipboard.setColSpan(cellModels, cellModels[1][1])
            clipboard.setColSpan(cellModels, cellModels[1][2])

            // 期望[1][1]的cell.colSpan = 2, 因为距离它旁边有一个隐藏cell
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)

            expect(cellModels[1][0].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.COL_SPAN__TWO)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
        })

        it('setColSpan场景2', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, colSpan: 1, isHide: false },
                    { X: 0, Y: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, colSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, colSpan: 1, isHide: true },
                    { X: 1, Y: 2, colSpan: 1, isHide: true }
                ]
            ]

            clipboard.setColSpan(cellModels, cellModels[0][0])
            clipboard.setColSpan(cellModels, cellModels[0][1])
            clipboard.setColSpan(cellModels, cellModels[0][2])

            clipboard.setColSpan(cellModels, cellModels[1][0])
            clipboard.setColSpan(cellModels, cellModels[1][1])
            clipboard.setColSpan(cellModels, cellModels[1][2])

            // 期望[1][0]的cell.colSpan = 3, 因为距离它最近的有2个隐藏cell
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)

            expect(cellModels[1][0].colSpan).to.be.equal(CONST.COL_SPAN___THREE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
        })

        it('setColSpan场景3', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, colSpan: 1, isHide: false },
                    { X: 0, Y: 1, colSpan: 1, isHide: true },
                    { X: 0, Y: 2, colSpan: 1, isHide: true }
                ],
                [
                    { X: 1, Y: 0, colSpan: 1, isHide: false },
                    { X: 1, Y: 1, colSpan: 1, isHide: true },
                    { X: 1, Y: 2, colSpan: 1, isHide: true }
                ]
            ]

            clipboard.setColSpan(cellModels, cellModels[0][0])
            clipboard.setColSpan(cellModels, cellModels[0][1])
            clipboard.setColSpan(cellModels, cellModels[0][2])

            clipboard.setColSpan(cellModels, cellModels[1][0])
            clipboard.setColSpan(cellModels, cellModels[1][1])
            clipboard.setColSpan(cellModels, cellModels[1][2])

            // 期望[1][0]的cell.colSpan = 3, 因为距离它最近的有2个隐藏cell
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.COL_SPAN___THREE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)

            expect(cellModels[1][0].colSpan).to.be.equal(CONST.COL_SPAN___THREE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
        })

        it('setColSpan场景4', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, colSpan: 1, isHide: true },
                    { X: 0, Y: 1, colSpan: 1, isHide: false },
                    { X: 0, Y: 2, colSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, colSpan: 1, isHide: true },
                    { X: 1, Y: 1, colSpan: 1, isHide: false },
                    { X: 1, Y: 2, colSpan: 1, isHide: false }
                ]
            ]

            clipboard.setColSpan(cellModels, cellModels[0][0])
            clipboard.setColSpan(cellModels, cellModels[0][1])
            clipboard.setColSpan(cellModels, cellModels[0][2])

            clipboard.setColSpan(cellModels, cellModels[1][0])
            clipboard.setColSpan(cellModels, cellModels[1][1])
            clipboard.setColSpan(cellModels, cellModels[1][2])

            // 全部colSpan不变
            expect(cellModels[0][0].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[0][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)

            expect(cellModels[1][0].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[1][1].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
            expect(cellModels[1][2].colSpan).to.be.equal(CONST.COL_SPAN_ONE)
        })
    })

    describe('setRowSpan 找到上方距离最近的isHide = false的cell, 并使cell.rowSpan + 1', () => {
        const CONST = {
            ROW_SPAN_ONE: 1,
            ROW_SPAN__TWO: 2,
            ROW_SPAN___THREE: 3
        }
        it('setRowSpan场景1', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, isHide: false },
                    { X: 0, Y: 1, rowSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, isHide: false },
                    { X: 1, Y: 1, rowSpan: 1, isHide: false },
                    { X: 1, Y: 2, rowSpan: 1, isHide: true }
                ]
            ]

            clipboard.setRowSpan(cellModels, cellModels[0][0])
            clipboard.setRowSpan(cellModels, cellModels[0][1])
            clipboard.setRowSpan(cellModels, cellModels[0][2])

            clipboard.setRowSpan(cellModels, cellModels[1][0])
            clipboard.setRowSpan(cellModels, cellModels[1][1])
            clipboard.setRowSpan(cellModels, cellModels[1][2])

            // 期望第一排的最后一个cell.rowSpan等于2, 因为它下方的cell是隐藏的
            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.ROW_SPAN__TWO)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
        })

        it('setRowSpan场景2', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, isHide: false },
                    { X: 0, Y: 1, rowSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, isHide: true },
                    { X: 1, Y: 1, rowSpan: 1, isHide: true },
                    { X: 1, Y: 2, rowSpan: 1, isHide: true }
                ]
            ]

            clipboard.setRowSpan(cellModels, cellModels[0][0])
            clipboard.setRowSpan(cellModels, cellModels[0][1])
            clipboard.setRowSpan(cellModels, cellModels[0][2])

            clipboard.setRowSpan(cellModels, cellModels[1][0])
            clipboard.setRowSpan(cellModels, cellModels[1][1])
            clipboard.setRowSpan(cellModels, cellModels[1][2])

            // 期望第一排的3个cell.rowSpan都等于2
            // 因为它们下方的cell都是隐藏的
            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.ROW_SPAN__TWO)
            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.ROW_SPAN__TWO)
            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.ROW_SPAN__TWO)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
        })

        it('setRowSpan场景3', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, isHide: false },
                    { X: 0, Y: 1, rowSpan: 1, isHide: false },
                    { X: 0, Y: 2, rowSpan: 1, isHide: false }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, isHide: true },
                    { X: 1, Y: 1, rowSpan: 1, isHide: true },
                    { X: 1, Y: 2, rowSpan: 1, isHide: true }
                ],
                [
                    { X: 2, Y: 0, rowSpan: 1, isHide: true },
                    { X: 2, Y: 1, rowSpan: 1, isHide: true },
                    { X: 2, Y: 2, rowSpan: 1, isHide: true }
                ]
            ]

            clipboard.setRowSpan(cellModels, cellModels[0][0])
            clipboard.setRowSpan(cellModels, cellModels[0][1])
            clipboard.setRowSpan(cellModels, cellModels[0][2])

            clipboard.setRowSpan(cellModels, cellModels[1][0])
            clipboard.setRowSpan(cellModels, cellModels[1][1])
            clipboard.setRowSpan(cellModels, cellModels[1][2])

            clipboard.setRowSpan(cellModels, cellModels[2][0])
            clipboard.setRowSpan(cellModels, cellModels[2][1])
            clipboard.setRowSpan(cellModels, cellModels[2][2])

            // 期望第一排的3个cell.rowSpan都等于3
            // 因为它们下方2排的cell都是隐藏的
            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.ROW_SPAN___THREE)
            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.ROW_SPAN___THREE)
            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.ROW_SPAN___THREE)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)

            expect(cellModels[2][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[2][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[2][2].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
        })

        it('setRowSpan场景4', () => {
            let cellModels = [
                [
                    { X: 0, Y: 0, rowSpan: 1, isHide: true },
                    { X: 0, Y: 1, rowSpan: 1, isHide: true },
                    { X: 0, Y: 2, rowSpan: 1, isHide: true }
                ],
                [
                    { X: 1, Y: 0, rowSpan: 1, isHide: true },
                    { X: 1, Y: 1, rowSpan: 1, isHide: true },
                    { X: 1, Y: 2, rowSpan: 1, isHide: true }
                ]
            ]

            clipboard.setRowSpan(cellModels, cellModels[0][0])
            clipboard.setRowSpan(cellModels, cellModels[0][1])
            clipboard.setRowSpan(cellModels, cellModels[0][2])

            clipboard.setRowSpan(cellModels, cellModels[1][0])
            clipboard.setRowSpan(cellModels, cellModels[1][1])
            clipboard.setRowSpan(cellModels, cellModels[1][2])

            // 第一排的isHide往上找不到cell, 所以应该全部cell的rowSpan都不变
            expect(cellModels[0][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[0][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[0][2].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)

            expect(cellModels[1][0].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][1].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
            expect(cellModels[1][2].rowSpan).to.be.equal(CONST.ROW_SPAN_ONE)
        })
    })

    describe('isAllHideOfTop 方法', () => {
        it('isAllHideOfTop场景1', () => {
            const cellModels = [
                [
                    { X: 0, Y: 0, isHide: false },
                    { X: 0, Y: 1, isHide: false },
                    { X: 0, Y: 2, isHide: true }
                ],
                [
                    { X: 1, Y: 0, isHide: false },
                    { X: 1, Y: 1, isHide: false },
                    { X: 1, Y: 2, isHide: true }
                ],
                [
                    { X: 2, Y: 0, isHide: false },
                    { X: 2, Y: 1, isHide: false },
                    { X: 2, Y: 2, isHide: false }
                ]
            ]

            const cell = { X: 2, Y: 2 }

            const isAllHide = clipboard.isAllHideOfTop(cellModels, cell)

            expect(isAllHide).to.be.equal(true)
        })

        it('isAllHideOfTop场景2', () => {
            const cellModels = [
                [
                    { X: 0, Y: 0, isHide: false },
                    { X: 0, Y: 1, isHide: false },
                    { X: 0, Y: 2, isHide: true }
                ],
                [
                    { X: 1, Y: 0, isHide: false },
                    { X: 1, Y: 1, isHide: false },
                    { X: 1, Y: 2, isHide: false }
                ],
                [
                    { X: 2, Y: 0, isHide: false },
                    { X: 2, Y: 1, isHide: false },
                    { X: 2, Y: 2, isHide: false }
                ]
            ]

            const cell = { X: 2, Y: 2 }

            const isAllHide = clipboard.isAllHideOfTop(cellModels, cell)

            expect(isAllHide).to.be.equal(false)
        })

        it('isAllHideOfTop场景3', () => {
            const cellModels = [
                [
                    { X: 0, Y: 0, isHide: false },
                    { X: 0, Y: 1, isHide: false },
                    { X: 0, Y: 2, isHide: false }
                ],
                [
                    { X: 1, Y: 0, isHide: false },
                    { X: 1, Y: 1, isHide: false },
                    { X: 1, Y: 2, isHide: true }
                ],
                [
                    { X: 2, Y: 0, isHide: false },
                    { X: 2, Y: 1, isHide: false },
                    { X: 2, Y: 2, isHide: false }
                ]
            ]

            const cell = { X: 2, Y: 2 }

            const isAllHide = clipboard.isAllHideOfTop(cellModels, cell)

            expect(isAllHide).to.be.equal(false)
        })

        it('isAllHideOfTop场景4', () => {
            const cellModels = [
                [
                    { X: 0, Y: 0, isHide: false },
                    { X: 0, Y: 1, isHide: false },
                    { X: 0, Y: 2, isHide: false }
                ],
                [
                    { X: 1, Y: 0, isHide: false },
                    { X: 1, Y: 1, isHide: false },
                    { X: 1, Y: 2, isHide: false }
                ],
                [
                    { X: 2, Y: 0, isHide: false },
                    { X: 2, Y: 1, isHide: false },
                    { X: 2, Y: 2, isHide: false }
                ]
            ]

            const cell = { X: 2, Y: 2 }

            const isAllHide = clipboard.isAllHideOfTop(cellModels, cell)

            expect(isAllHide).to.be.equal(false)
        })
    })
})