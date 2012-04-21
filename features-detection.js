var support = (function (window, undefined) {
    var document = window.document,
        navigator = window.navigator;
    var support = {
        canvas: !!window.CanvasRenderingContext2D,
        localStorage: (function () {
            try {
                window.localStorage.setItem('TestLocalStorage', 'TestLocalStorage');
                window.localStorage.removeItem('TestLocalStorage');
                return true;
            } catch (e) {
                return false;
            }
        }()),
        sessionStorage: (function () {
            try {
                window.sessionStorage.setItem('TestSessionStorage', 'TestSessionStorage');
                window.sessionStorage.removeItem('TestSessionStorage');
                return true;
            } catch (e) {
                return false;
            }
        }()),
        webworkers: (function () {
            return !!window.Worker;
        }()),
        applicationcache: (function () {

            return !!window.applicationCache;
        }()),
        dragenddrop: (function () {
            var div = document.createElement('div');
            return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
        }()),
        geolocation: (function () {
            return !!navigator.geolocation;
        }()),
        input: (function (attributs) {
            var inputElem = document.createElement('input'),
                inputAttributes = [],
                i = 0,
                len = attributs.length;
            for (i; i < len; i = i + 1) {
                inputAttributes[attributs[i]] = !!(attributs[i] in inputElem);
            }
            if (inputAttributes.list) {
                // safari false positive's on datalist: webk.it/74252
                // see also github.com/Modernizr/Modernizr/issues/146
                inputAttributes.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return inputAttributes;
        }(["accept", "alt", "autocomplete", "autofocus", "checked", "dirname", "disabled", "height", "list", "max", "maxlength", "min", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "type", "value", "width"])),
        /*
        http://www.whatwg.org/specs/web-apps/current-work/#the-audio-element
        Returns the empty string (a negative response), "maybe", or "probably" based on how confident the user agent is that it can play media resources of the given type.
        
        */
        audio: (function () {
            var audio = {
                'enabled': false
            },
                AudioElem = document.createElement('audio');
            try {
                if (!!AudioElem.canPlayType) {
                    audio.enabled = true;

                    audio.mp3 = AudioElem.canPlayType('audio/mpeg;').replace(/no/, '');
                    audio.wav = AudioElem.canPlayType('audio/wav; codecs="1"').replace(/no/, '');
                    audio.m4a = (AudioElem.canPlayType('audio/x-m4a;') || AudioElem.canPlayType('audio/aac;')).replace(/no/, '');
                    //FLAC audio alone in Ogg container
                    audio.flac = AudioElem.canPlayType('audio/ogg; codecs="flac"').replace(/no/, '');
                    //Speex audio alone in Ogg container
                    audio.flac = AudioElem.canPlayType('audio/ogg; codecs="speex"').replace(/no/, '');
                    //Vorbis audio alone in Ogg container
                    audio.ogg = AudioElem.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '');

                } else {
                    audio.enabled = false;
                }
            } catch (e) {}
            return audio;

        }()),
        video: (function () {
            var video = {
                'enabled': false
            },
                videoElem = document.createElement('video');
            try {
                if (!!videoElem.canPlayType) {
                    video.enabled = true;
                    video.ogg = videoElem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
                    video.h264 = videoElem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
                    video.webm = videoElem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
                } else {
                    video.enabled = false;
                }
            } catch (e) {}
            return video;

        }())
    };

    return support;


}(window));
