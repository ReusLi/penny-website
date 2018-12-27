import { CellKey, SelectInfo } from 'interface/common'

/**
 * 矩阵工具类
 */
class MatrixUtils {
    /**
     * 构建XY坐标中的两点
     * startCell, endCell可能会有4个不同组合的起始点
     * 但经过 buildXY 计算, 均会变成 startCell左上角 到 endCell右下角
     * 
     * @return {SelectInfo} SelectInfo 可以去 interface/common 找
     */
    public buildXY(startCell: CellKey, endCell: CellKey) {
        let sc: CellKey = {
            X: 0,
            Y: 0
        }
        let ec: CellKey = {
            X: 0,
            Y: 0
        }

        startCell.X < endCell.X
            ? sc.X = startCell.X
            : sc.X = endCell.X

        startCell.Y < endCell.Y
            ? sc.Y = startCell.Y
            : sc.Y = endCell.Y

        startCell.X > endCell.X
            ? ec.X = startCell.X
            : ec.X = endCell.X

        startCell.Y > endCell.Y
            ? ec.Y = startCell.Y
            : ec.Y = endCell.Y

        return {
            startCell: sc,
            endCell: ec
        }
    }

    public isInSideCell(selectInfo: SelectInfo, cellKey: CellKey) {
        let isInSide = false

        let x0 = selectInfo.startCell.X,
            y0 = selectInfo.startCell.Y,
            x1 = selectInfo.endCell.X,
            y1 = selectInfo.endCell.Y,
            cX = cellKey.X,
            cY = cellKey.Y;

        if (x0 <= cX && cX <= x1 && y0 <= cY && cY <= y1) {
            isInSide = true;
        }

        return isInSide;
    }
}

let MatrixUtil = new MatrixUtils()
export default MatrixUtil