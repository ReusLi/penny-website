require(['jquery'], function($) {
    var ctrl = function() {

    }

    ctrl.prototype = {
        init: function() {

        },

        bindEvent: function() {
            $('#btn_1').on('click', function() {
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
})