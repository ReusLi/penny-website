import { CellProps } from './interface'

export class cellStyleJudge {
    public focusClass = {
        TOP: 'custom-focus-top',
        RIGHT: 'custom-focus-right',
        BOTTOM: 'custom-focus-bottom',
        LEFT: 'custom-focus-left'
    }

    constructor () {

    }

    public isTop(className: Array<string>, props: CellProps) {
        var myRow = props.cellKey.X,
            startRow = props.selectInfo.startCell.X;

        if (myRow === startRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    public isRight(className: Array<string>, props: CellProps) {
        var myCol = props.cellKey.Y,
            endCol = props.selectInfo.endCell.Y;

        if (myCol === endCol) {
            className.push(this.focusClass.RIGHT)
        }
        return className;
    }

    public isBottom(className: Array<string>, props: CellProps) {
        var myRow = props.cellKey.X,
            endRow = props.selectInfo.endCell.X;
        if (myRow === endRow) {
            className.push(this.focusClass.BOTTOM)
        }
        return className;
    }

    public isLeft(className: Array<string>, props: CellProps) {
        var myCol = props.cellKey.Y,
            startCol = props.selectInfo.startCell.Y;

        if (myCol === startCol) {
            className.push(this.focusClass.LEFT)
        }

        return className;
    }

}