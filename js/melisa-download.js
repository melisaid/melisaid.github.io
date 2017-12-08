
(function ($) {
    "use strict"; // Start of use strict
    // change year
    var d = new Date();
    var n = d.getFullYear();
    $('.year').text(n);
    // github release
    $.get('https://api.github.com/repos/melisaid/melisa/releases/latest', function (data) {

        var asset = {}
        var html = ``
        if (platform.os.family == 'OS X') {

            html = `
            <i class="fa fa-apple" aria-hidden="true"></i> Download For MacOS (${data.tag_name})
            `
            asset = data.assets.find(item => item.name.includes('dmg'))
        } else if (platform.os.family == 'Windows' || platform.os.family == 'Windows XP') {
            html = `
            <i class="fa fa-windows" aria-hidden="true"></i> Download For Windows ${platform.os.architecture} (${data.tag_name})
            `
            asset = data.assets.find(item => item.name.includes('exe'))
        } else {
            html = `
            <i class="fa fa-${platform.os.family.toLowerCase()}" aria-hidden="true"></i> Melisa Belum Tersedia di ${platform.os.family}
            `
            asset = {
                browser_download_url: data.html_url
            }
        }
        $('#download-button').html(html).removeClass('disabled').attr('href', asset.browser_download_url);
        $('.version').text(data.tag_name);
        $('#changelog-body').html(data.body);
    }, 'json');
})(jQuery);  