class {
    init() {

    }

    bindEvent() {
        $('#btn_1').on('click', function () {
            window.open('www.reusli.com')
        })

        /** bbbb */
        utils.open({
            url: 'wwww.penny.com',
            isFrame: false
        })
        /** bbbb */
    }
}