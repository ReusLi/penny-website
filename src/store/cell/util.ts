import { CellKey } from 'interface/common'

// interface
import { SelectInfo } from 'table/interface'

// utils 
import MatrixUtils from 'utils/matrix.utils'

class Util {
    /**
     * 更新坐标范围
     * @param cellKey 
     */
    updateCurKeyRand(cellKey: CellKey, mouseDownPoint: CellKey) {
        let startCell_X = mouseDownPoint.X,
            startCell_Y = mouseDownPoint.Y

        let selectInfo: SelectInfo = {
            startCell: {
                X: startCell_X,
                Y: startCell_Y
            },
            endCell: {
                X: cellKey.X,
                Y: cellKey.Y
            }
        }

        selectInfo = MatrixUtils.buildXY(selectInfo.startCell, selectInfo.endCell)

        return selectInfo
    }
}

export default new Util()