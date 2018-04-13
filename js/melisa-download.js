
(function ($) {
    //"use strict"; // Start of use strict
    // change year
    var d = new Date();
    var n = d.getFullYear();
    $('.year').text(n);

    var releaseUrl = window.location.hostname === 'localhost' ? 'http://api.localhost/latest' : 'https://api.github.com/repos/melisaid/melisa/releases/latest';
    var counterUrl = window.location.hostname === 'localhost' ? 'http://api.localhost/counter' : 'https://api.melisa.id/counter';
    var s3Url = 'https://s3-ap-southeast-1.amazonaws.com/melisa-app/';
    // melisa counter
    $.get(counterUrl, function (data) {

        $('.user-counter').text(parseInt(data.user).toLocaleString());
    }, 'json');
    // github release
    $.get(releaseUrl, function (data) {

        var asset = {}
        var html = ''
        var linux = ["Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE"];
        var s3DowlnloadUrl = '';
        var assetName = ''
        if (platform.os.family == 'OS X') {

            html = '<i class="fa fa-apple" aria-hidden="true"></i> Download For MacOS (' + data.tag_name + ')';
            asset = _.find(data.assets, function (item) { return item.name.includes('dmg') })
            assetName = asset.name
            s3DowlnloadUrl = s3Url + encodeURI(assetName)
        } else if (platform.os.family.indexOf('Windows') > -1) {
            html = '<i class="fa fa-windows" aria-hidden="true"></i> Download For Windows ' + platform.os.version + '/' + platform.os.architecture + '-bit (' + data.tag_name + ')';
            asset = _.find(data.assets, function (item) { return item.name.includes('exe') })
            assetName = 'Melisa Setup ' + data.name + '.exe';
            s3DowlnloadUrl = s3Url + encodeURI(assetName)
        }
        else if (linux.indexOf(platform.os.family) > -1) {
            html = '<i class="fa fa-windows" aria-hidden="true"></i> Download For ' + platform.os.family + '/' + platform.os.architecture + '-bit (' + data.tag_name + ')';
            if (platform.os.architecture == 32) {
                asset = _.find(data.assets, function (item) { return item.name.includes('i386.AppImage') })

            } else {
                asset = _.find(data.assets, function (item) { return item.name.includes('x86_64.AppImage') })
            }
            assetName = asset.name;
            s3DowlnloadUrl = s3Url + encodeURI(assetName)

        }
        else {
            html = '<i class="fa fa-' + platform.os.family.toLowerCase() + '" aria-hidden="true"></i> Melisa Belum Tersedia di ' + platform.os.family
            asset = {
                browser_download_url: data.html_url
            }
            s3DowlnloadUrl = data.html_url;
        }
        //asset.browser_download_url
        $('#download-button').html(html).removeClass('disabled').attr('href', s3DowlnloadUrl);
        $('.version').text(data.tag_name);
        $('#changelog-body').html(data.body);
    }, 'json');
})(jQuery);  