// utils
import MatrixUtils from 'utils/matrix.utils'

describe('MatrixUtils 矩阵工具类', () => {
    describe('buildXY 不同起点,终点,均返回左上角和右下角的2点坐标', () => {

        let selectInfo = {
            startCell: {
                X: 0,
                Y: 0
            },
            endCell: {
                X: 0,
                Y: 0
            }
        }

        it('期望(0,0),(7,7) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = MatrixUtils.buildXY(selectInfo.startCell, selectInfo.endCell)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })

        it('期望(0,7),(7,0) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = MatrixUtils.buildXY(selectInfo.startCell, selectInfo.endCell)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })

        it('期望(7,7),(0,0) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = MatrixUtils.buildXY(selectInfo.startCell, selectInfo.endCell)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })

        it('期望(7,0),(0,7) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = MatrixUtils.buildXY(selectInfo.startCell, selectInfo.endCell)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })
    })
})