const commonUtil = {
    /**
     * 判断2个string是否一样, 不区分大小写
     * 因为Babel在不同版本中, type可能会大小写不同
     * 如 ExpressionStatement 和 expressionStatement
     * @param {string} strA 
     * @param {string} strB 
     */
    isStrEqual(strA, strB) {
        return strA.toLocaleLowerCase() === strB.toLocaleLowerCase()
    }
}

const typeUtil = {
    isExpression(node) {
        return commonUtil.isStrEqual(node.type, 'ExpressionStatement')
    }
}

const Utils = {
    isExpression
}

module.exports = Utils