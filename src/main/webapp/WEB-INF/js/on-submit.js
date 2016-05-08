/**
 * Created by Go on 2016/3/25.
 */
(function () {
    var password = document.getElementsByTagName("input");
    $("form").on("submit", function () {
        password[2].value = $.md5(password[1].value);
    })
}());